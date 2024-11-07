import React, { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useTheme } from "next-themes";
import Image from "next/image";

const MapComponent: React.FC = () => {
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const style = useMemo(() => {
    return theme === "dark"
      ? "mapbox://styles/mapbox/dark-v10"
      : "mapbox://styles/mapbox/standard";
  }, [theme]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: mapContainerRef.current as HTMLElement,
      style: style,
      center: [-79.327054, 43.772567],
      minZoom: 9,
      maxZoom: 9,
      dragPan: false
    });

    map.on("load", () => {
      setMapLoaded(true);
    });

    return () => map.remove(); // Cleanup on unmount
  }, [style]);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden">
      {!mapLoaded && (
        <div className="bg-gray-300 size-full animate-pulse"/>
      )}
      
      <div ref={mapContainerRef} className="w-full h-full" />

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            flex items-center justify-center
            size-14 md:size-24 rounded-full 
            shadow-lg cursor-pointer bg-blue-400 bg-opacity-30 border-2 md:border-2 border-white border-opacity-80"
      >
        <Image
          alt="Icon"
          className="w-8 h-8 md:w-10 md:h-10"
          height={300}
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Robot.png"
          width={300}
          unoptimized
        />
      </div>
    </div>
  );
};

export default MapComponent;
