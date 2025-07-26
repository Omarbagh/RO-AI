// scripts/renderTemplatesToPNG.ts
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Fix voor __dirname in ES modules
type Dirname = string;
const __filename = fileURLToPath(import.meta.url);
const __dirname: Dirname = path.dirname(__filename);

const PORT = 3005;
const templatesDir = path.join(__dirname, '../src/components/templates');
const outputDir = path.join(__dirname, '../previews');

// Dummy data voor alle templates
const dummyData = {
  personal: {
    name: 'Dr. Jane Doe',
    title: 'Assistant Professor of Computer Science',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    photoUrl: '../public/person-dummy.jpg',
  },
  profile: 'My research focuses on machine learning, computer vision, and ethics in AI.',
  skills: ['Python', 'Deep Learning', 'Data Analysis', 'Scientific Writing'],
  experience: [
    {
      job: 'Postdoctoral Researcher',
      company: 'MIT Media Lab',
      description: 'Conducted interdisciplinary research in AI and society.',
      period: '2020–2023',
    },
  ],
  education: [
    {
      school: 'Stanford University',
      degree: 'Ph.D. in Computer Science',
      year: '2020',
    },
  ],
};

// Helper om server beschikbaarheid te checken
async function waitForServerReady(port: number, timeout = 10000): Promise<void> {
  const start = Date.now();
  return new Promise<void>((resolve, reject) => {
    (function check() {
      const req = http.request({ method: 'GET', host: 'localhost', port, path: '/' }, res => {
        res.destroy();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start < timeout) {
          setTimeout(check, 200);
        } else {
          reject(new Error(`Server not ready after ${timeout}ms`));
        }
      });
      req.end();
    })();
  });
}

// Express server opzetten
async function startServer(): Promise<void> {
  const app = express();
  app.use(express.static(path.join(__dirname, '../')));

  app.get('/render/:template', async (req, res) => {
    const templateName = req.params.template;
    try {
      // Dynamisch import van het component
      const templateModule = await import(`../src/components/templates/${templateName}.tsx`);
      const Template = templateModule.default || templateModule[templateName];
      if (!Template) throw new Error('Component not found in module');

      // Render de React-component naar statische HTML
      const html = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Template, { data: dummyData })
      );

      // Stuur HTML met Tailwind, dark theme en accent-variabele
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <!-- Tailwind via CDN -->
            <script src="https://cdn.tailwindcss.com"></script>
            <!-- Accent-variabele -->
            <style>
              :root { --accent: #4F46E5; }
              body { margin: 0; padding: 0; }
            </style>
          </head>
          <body class="bg-black text-white antialiased">
            <div id="root" class="max-w-4xl mx-auto p-8">
              ${html}
            </div>
          </body>
        </html>
      `);
    } catch (err) {
      console.error(`❌ Error rendering ${templateName}:`, err);
      const stack = err instanceof Error ? err.stack : String(err);
      res.status(500).send(`
        <!DOCTYPE html><html><body>
          <h1 style="color:red">Failed to render ${templateName}</h1>
          <pre>${stack}</pre>
        </body></html>
      `);
    }
  });

  return new Promise<void>(resolve => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
      resolve();
    });
  });
}

// Puppeteer gebruikt om screenshots te maken
async function renderTemplates(): Promise<void> {
  const files = fs.readdirSync(templatesDir)
    .filter(f => f.endsWith('.tsx'))
    .map(f => path.basename(f, '.tsx'));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const template of files) {
    const url = `http://localhost:${PORT}/render/${template}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      const element = await page.$('#root');
      if (!element) {
        console.warn(`⚠️ #root niet gevonden voor ${template}`);
        continue;
      }
      await element.screenshot({ path: path.join(outputDir, `${template}.png`) as `${string}.png` });
      console.log(`✅ Saved: ${template}.png`);
    } catch (err) {
      console.error(`❌ Screenshot failed for ${template}:`, err);
    }
  }

  await browser.close();
}

// Main flow
(async () => {
  await startServer();
  await waitForServerReady(PORT, 15000);
  await renderTemplates();
  console.log('🎉 Alle templates gerenderd naar PNG!');
})();
