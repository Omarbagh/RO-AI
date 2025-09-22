import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, context } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: context || "Je bent een professionele CV schrijver.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.8,
    }),
  });
  const data = await response.json();
  return NextResponse.json(data.choices?.[0]?.message?.content || "");
}
