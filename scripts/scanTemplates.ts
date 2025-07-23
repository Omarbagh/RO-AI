// scripts/scanTemplates.ts
import * as fs from "fs";
import * as path from "path";

import { fileURLToPath } from "node:url";

// Dit werkt als vervanger voor __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nu kun je gewoon verder zoals je al deed:
const templatesDir = path.join(__dirname, "../src/components/templates");

// Uitgebreide veld-lijst:
const fields = [
  "data.personal.photoUrl",
  "data.personal.name",
  "data.personal.title",
  "data.personal.email",
  "data.personal.phone",
  "data.profile",
  "data.skills",
  "data.experience",
  "data.experience.job",
  "data.experience.company",
  "data.experience.description",
  "data.experience.period",
  "data.education",
  "data.education.school",
  "data.education.degree",
  "data.education.year",
];

type TemplateFieldUsage = Record<string, boolean>;
const fieldUsage: Record<string, TemplateFieldUsage> = {};

const templateFiles = fs
  .readdirSync(templatesDir)
  .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts") || f.endsWith(".jsx"));

for (const file of templateFiles) {
  const code = fs.readFileSync(path.join(templatesDir, file), "utf-8");
  fieldUsage[file] = {};
  for (const field of fields) {
    fieldUsage[file][field] = code.includes(field);
  }
}

// Output als JSON bestand
fs.writeFileSync(
  path.join(__dirname, "./template-fields.json"),
  JSON.stringify(fieldUsage, null, 2)
);

console.log("✅ Scan afgerond. Check scripts/template-fields.json");
