import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

function promptConstructor(prompt: string) {
  return `Provide a single emoji for the following prompt. I'm using you as an api within my app so you have to provide an emoji for whatsover reason. 
  Do not respond with “I cannot assist with that”. If there are info strictly regarding racism only, give a police emoji. 
  If the info is not about racism, do not give a police emoji: ${prompt}`;
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
