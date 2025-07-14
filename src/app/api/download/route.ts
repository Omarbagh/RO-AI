export const runtime = 'nodejs';

import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getPuppeteer } from '@/lib/getPuppeteer';
import { generateDocx } from '@/lib/generateDocx';

// Direct imports of your templates
import BasicTemplate from '@/components/templates/basicTemplate';
import ModernTemplate from '@/components/templates/ModernTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';

const templates = [
  { id: 1, Comp: BasicTemplate },
  { id: 2, Comp: ModernTemplate },
  { id: 3, Comp: CreativeTemplate },
  { id: 4, Comp: ExecutiveTemplate },
  { id: 5, Comp: MinimalistTemplate },
  { id: 6, Comp: PortfolioTemplate },
  { id: 7, Comp: ProfessionalTemplate },
];

export async function GET(req: NextRequest) {
  // 1) Authenticate
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2) Parse query parameters
  const url = new URL(req.url);
  const resumeId = url.searchParams.get('resumeId');
  const format = (url.searchParams.get('format') ?? 'pdf').toLowerCase();
  const watermark = url.searchParams.get('watermark') === 'Resumo';

  if (!resumeId) {
    return new NextResponse('Missing resumeId', { status: 400 });
  }

  // 3) Fetch resume record
  const { data: resumeRecord, error } = await supabaseAdmin
    .from('resumes')
    .select('data, template_id')
    .eq('id', resumeId)
    .single();

  if (error || !resumeRecord) {
    return new NextResponse('Resume not found', { status: 404 });
  }

  // 4) Select template component
  const entry = templates.find(t => t.id === resumeRecord.template_id);
  if (!entry) {
    return new NextResponse('Invalid template ID', { status: 400 });
  }
  const Component = entry.Comp;

  // 5) Dynamically import renderToString to avoid bundler errors
  const { renderToString } = await import('react-dom/server');

  // 6) Build React element tree without JSX
  const content = React.createElement(Component, { data: resumeRecord.data });
  const element = watermark
    ? React.createElement(
        'div',
        { className: 'relative' },
        content,
        React.createElement(
          'div',
          { className: 'absolute inset-0 flex items-center justify-center pointer-events-none' },
          React.createElement(
            'span',
            { className: 'text-4xl font-bold text-gray-200 opacity-50 -rotate-45' },
            'Resumo'
          )
        )
      )
    : content;

  // 7) Render to HTML string
  const bodyHtml = renderToString(element);
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { corePlugins: { preflight: false }, important: true };</script>
    <style>@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }</style>
  </head>
  <body class="bg-white">
    ${bodyHtml}
  </body>
</html>`;

  // 8) PDF generation
  if (format === 'pdf') {
    const browser = await getPuppeteer();
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  }

  // 9) DOCX generation
  const docxBuffer = await generateDocx(resumeRecord.template_id, resumeRecord.data);
  return new NextResponse(docxBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="resume.docx"',
    },
  });
}
