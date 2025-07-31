import path from 'path';
import fs from 'fs';

const templatesDir = path.resolve(process.cwd(), 'src/components/templates');


export async function getAllTemplates() {
  const files = fs.readdirSync(templatesDir).filter(file => file.endsWith('Template.tsx'));
  const templates = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const nameWithoutExt = file.replace(/\.tsx$/, '');        // "BasicTemplate"
    const id = nameWithoutExt.replace('Template', '').toLowerCase();  // "basic"
    const mod = await import(`@/components/templates/${nameWithoutExt}`);
    const Comp = mod.default || mod[nameWithoutExt];
    templates.push({ id, Comp, name: nameWithoutExt });
  }
  return templates;
}
