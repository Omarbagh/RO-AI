import { NextRequest, NextResponse } from 'next/server';
// @ts-expect-error: Geen types voor pdf-parse/lib/pdf-parse.js
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { OpenAI } from 'openai';
import PDFParser from 'pdf2json';

// --- Types ---
type Suggestion = {
  text: string;
  indices: [number, number][];
  page?: number;
  bbox?: { x1: number; y1: number; x2: number; y2: number };
};

interface Pdf2JsonTextBlock {
  x: number;
  y: number;
  w?: number;
  h?: number;
  R: { T: string }[];
}

interface Pdf2JsonPage {
  PageNumber?: number;
  Texts: Pdf2JsonTextBlock[];
}

interface Pdf2JsonResult {
  FormImage: {
    Pages: Pdf2JsonPage[];
  };
}

// --- PDF tekstlocatie helper met afvangen van lege/onjuiste PDF's ---
async function findTextLocationsWithPdf2json(
  pdfBuffer: Buffer,
  suggestions: { text: string; indices: [number, number][] }[]
) {
  function parse(buffer: Buffer): Promise<Pdf2JsonResult> {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
      pdfParser.on("pdfParser_dataError", err => reject(err.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData: unknown) => resolve(pdfData as Pdf2JsonResult));
      pdfParser.parseBuffer(buffer);
    });
  }

  const pdfData = await parse(pdfBuffer);

  // Check op correcte structuur, anders leeg resultaat
  if (!pdfData || !pdfData.FormImage || !Array.isArray(pdfData.FormImage.Pages)) {
    console.error('pdf2json parse probleem, structuur:', JSON.stringify(pdfData, null, 2));
    return suggestions.map(suggestion => ({
      ...suggestion,
      page: undefined,
      bbox: undefined,
    }));
  }

  // Vind per suggestie de eerste match in de PDF
  return suggestions.map((suggestion) => {
    let found = false;
    let pageResult: number | undefined = undefined;
    let bbox: { x1: number; y1: number; x2: number; y2: number } | undefined = undefined;

    for (const page of pdfData.FormImage.Pages) {
      const pageNum = page.PageNumber || pdfData.FormImage.Pages.indexOf(page) + 1;
      for (const textBlock of page.Texts) {
        const str = decodeURIComponent(textBlock.R.map((r) => r.T).join(""));
        if (str.includes(suggestion.text)) {
          pageResult = pageNum;
          found = true;
          bbox = {
            x1: textBlock.x,
            y1: textBlock.y,
            x2: textBlock.x + (textBlock.w || 2),
            y2: textBlock.y + (textBlock.h || 2),
          };
          break;
        }
      }
      if (found) break;
    }

    return {
      ...suggestion,
      page: pageResult,
      bbox,
    };
  });
}

// --- API Handler ---
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || !file.type.includes('pdf')) {
      return NextResponse.json({ error: 'PDF file required' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(fileBuffer);
    const text = parsed.text;

    // Prompt voor ATS-analyse
    const prompt = `
Je bent een ervaren ATS (Applicant Tracking System) CV-analyse expert.
Analyseer onderstaande cv-tekst en geef een JSON-object terug met:
1. score: een integer percentage van 0-100 voor ATS-compatibiliteit.
2. score_reason: een korte uitleg waarom deze score is gegeven (1 zin).
3. suggestions: een array van objecten { text: string, indices: [[start, end], ...] } waarbij text een te verbeteren zin/onderdeel is, en indices de posities in de tekst.
Antwoord uitsluitend met geldige JSON.
----
CV tekst:
${text}
    `.trim();

    const completion = await openAI.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Je analyseert cv’s op ATS-geschiktheid.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0].message?.content || '{}';
    let result: { score: number; score_reason: string; suggestions: Suggestion[] };

    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, responseText);
      return NextResponse.json(
        { error: 'Invalid JSON from AI', debug: responseText },
        { status: 500 }
      );
    }

    // Per suggestie: bepaal page + bbox
    const suggestionsWithLocation = await findTextLocationsWithPdf2json(fileBuffer, result.suggestions);

    return NextResponse.json({
      score: result.score,
      score_reason: result.score_reason,
      content: text,
      suggestions: suggestionsWithLocation,
    });

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        return NextResponse.json({ error: 'Error processing PDF', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
