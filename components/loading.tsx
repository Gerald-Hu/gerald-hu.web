'use client'
import { LoadingContext } from "@/context/loadingContextProvider";
import { useContext } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("LoadingContext must be used within LoadingContextProvider");
  const { loading } = context;

  return (
    <>
      {loading &&
        <>
          <div className="fixed w-screen h-screen inset-0 z-40 bg-[#f6f2f2]/50 dark:bg-[#0b0f11]/50 backdrop-blur-sm"/>

          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 px-8">
            <DotLottieReact
              src="/loading.lottie"
              loop
              autoplay
              speed={2}
              segment={[60, 160]}
            />
          </div>
        </>
      }
    </>
  );
}

export default Loading;