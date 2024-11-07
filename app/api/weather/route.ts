import { NextRequest, NextResponse } from "next/server";


export async function GET() {

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Toronto`);

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