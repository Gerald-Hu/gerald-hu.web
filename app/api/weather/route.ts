import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Toronto`, {
      cache : "no-store"
    });

    const data = await response.json();

    return NextResponse.json(
      { result: data.current.condition.text },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {message: "Cannot Get Weather", Error: "Weather API is down"},
      {status: 500}
    );
  }

}