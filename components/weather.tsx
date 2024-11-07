import Image from "next/image";
import { useEffect, useState } from "react";

import { default as emojiMap } from "unicode-emoji-json";
import { HashLoader } from "react-spinners";

import { fuzzySearch } from "@/lib/fuzzySearch";
import { Emoji } from "@/types/emoji";

const Weather = () => {

  const [weather, setWeather] = useState<null | string>(null);
  const [emoji, setEmoji] = useState<Emoji | null>(null);
  const [time, setTime] = useState();

  async function getWeather(){
    
    const response = await fetch("/api/weather");
    
    const {result} = await response.json();

    updateEmoji(result);

    setWeather(result);

  }
  
  async function updateEmoji(prompt: string){
    try {

      const response = await fetch("/api/emoji", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const emojiName =
        emojiMap[`${data.result}` as keyof typeof emojiMap]["name"];

      const searchedResult = fuzzySearch(emojiName);

      if (searchedResult) {
        setEmoji(searchedResult);
      }
    } catch (e) {

      console.error(e);

    }
  }

  useEffect(()=>{
    getWeather()
  },[]);

  return (
    <div className="size-full flex flex-col justify-center items-center">

      <div className="w-full h-3/5 flex justify-center items-center relative">
      {emoji != null && <Image alt="Animated Emoji" src={emoji.url} fill objectFit="contain" unoptimized/>}
      </div>

      <div className="w-full flex flex-col lg:gap-y-1 xl:gap-y-2 justify-center items-center h-1/3 text-xs lg:text-medium">
        <div>
          It{"'"}s {weather != null && <span className="font-oleo text-lg lg:text-2xl text-cyan-700 dark:text-emerald-400">{weather}</span>} in my city.
        </div>
        <div>
          How{"'"}bout yours?
        </div>
      </div>
    </div>
  );
};

export default Weather;