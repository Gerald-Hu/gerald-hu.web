import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

function promptConstructor(prompt: string) {
  return `Give a quote in the same language as the input that inspires this input: ${prompt}. Just give the quote without explanation. We prefer shorter quotes. Also, provide the author as well. Finally, return them in pure JSON format with no markdown. `;
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  openai.apiKey = process.env.OPENAI_API_KEY ?? "";

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 },
    );
  }

  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: promptConstructor(prompt) }],
    });

    return NextResponse.json(
      { result: completion.choices[0].message.content },
      { status: 200 },
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error generating completion", error: error.message },
      { status: 500 },
    );
  }
}