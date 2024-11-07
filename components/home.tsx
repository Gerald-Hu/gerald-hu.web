"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Responsive } from "react-grid-layout";
import { useState, useRef, useContext, useEffect} from "react";

import { cn } from "@/lib/utils";
import AvatarTransition from "@/components/avatar";
import { DockDemo } from "@/components/dock-demo";
import CardStack from "@/components/card-stack";
import AnimatedEmoji from "@/components/animated-emoji";
import IconCloud from "@/components/icon-cloud";
import MapComponent from "@/components/map";
import NotterApp from "@/components/notterApp";
import Contact from "@/components/contact";
import Weather from "@/components/weather";
import Company from "@/components/company";
import { layouts, selectedCard } from "@/config/layout";
import { icons } from "@/config/icons";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useRouter } from "next/navigation";
import Computers from '@/components/computers'
import Quote from "@/components/quote";
import Gallery from "@/components/gallery";
import { GoXCircle } from "react-icons/go";
import {LoadingContext} from "@/context/loadingContextProvider";

interface HomeProps {
  photos: string[];
  actionImageUrl: string;
}

const Home = ({
  photos,
  actionImageUrl,
}: HomeProps) => {
  const router = useRouter();

  const width = useWindowWidth();
  const [tabSelected, setTabSelected] = useState("all");
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const offset = useRef(0);

  const context = useContext(LoadingContext);
  if (!context) throw new Error("LoadingContext must be used within LoadingContextProvider");
  const {setLoading} = context;

  const closeGallery = () => {
    setShowGallery(false);
    document.documentElement.style.overflow = "unset";
    offset.current = 0;
  }

  const openGallery = (index: number) => {
    offset.current = document.documentElement.scrollTop;
    document.documentElement.style.overflow = "hidden"; 
    setGalleryIndex(index);
    setShowGallery(true);
  }

  useEffect(()=>{
    setLoading(false);
  },[]);

  if (!width) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs
        aria-label="Tabs"
        className="mb-2 md:mb-6 rounded-full"
        classNames={{
          cursor: "shadow-none",
          tabList:
            "bg-[#ece7e7] dark:bg-darkBg border-2 border-transparent dark:border-knight rounded-full",
        }}
        motionProps={{
          initial: { scale: 0.8 },
          animate: { scale: 1 },
          exit: { scale: 0.8 },
          transition: { type: "spring", stiffness: 300, damping: 15 },
        }}
        radius={"full"}
        onSelectionChange={(selected) => {
          if (selected === "blog") {
            setLoading(true);
            router.push("/blog");
            return;
          }

          setTabSelected(selected as string);
        }}
      >
        <Tab key="all" title="All" />
        <Tab key="about" title="About" />
        <Tab key="blog" title="Blog" />
      </Tabs>

      <Responsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        className="layout w-full h-full"
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
        isDraggable={width > 996}
        isResizable={false}
        layouts={layouts[tabSelected]}
        margin={[15, 15]}
        width={width}
      >
        <div
          key="avatar"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-between p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["avatar"] ? "opacity-100" : "opacity-50"
          )}
        >
          <AvatarTransition />
          <p className="text-[12px] xs:text-sm md:text-medium">
            Hello. It{"'"}s <span className="font-oleo text-2xl">Gerald Hu</span>, a
            practitioner in software engineering.
            Currently, I{"'"}m building a social engagement-oriented product and co-running
            a local software consulting company. My passion spans
            web development, iOS/Flutter development, and graphic design.
          </p>
          <DockDemo />
        </div>
        <div
          key="weather"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["weather"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <Weather />
        </div>
        <div
          key="cardStack"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[2]",
            selectedCard[tabSelected]["cardStack"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <CardStack photos={photos} openGallery={openGallery} />
        </div>
        <div
          key="animatedEmoji"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["animatedEmoji"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <AnimatedEmoji />
        </div>
        <div
          key="mapComponent"
          className={cn(
            "bg-white dark:bg-darkBg cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["mapComponent"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <MapComponent />
        </div>
        <div
          key="iconCloud"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center relative overflow-hidden p-10 md:p-8 z-[1]",
            selectedCard[tabSelected]["iconCloud"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <IconCloud iconSlugs={icons} />
        </div>
        <div
          key="quote"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["quote"] ? "opacity-100" : "opacity-50"
          )}
        >
          <Quote />

        </div>
        <div
          key="contact"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["contact"] ? "opacity-100" : "opacity-50"
          )}
        >
          <Contact />
        </div>
        <div
          key="computer"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
            selectedCard[tabSelected]["computer"]
              ? "opacity-100"
              : "opacity-50"
          )}
        >
          <Computers />
        </div>
        <div
          key="company"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["company"] ? "opacity-100" : "opacity-50"
          )}
        >
          <Company photoUrl={actionImageUrl} />
        </div>
        <div
          key="notter"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
            selectedCard[tabSelected]["notter"] ? "opacity-100" : "opacity-50"
          )}
        >

          <NotterApp photoUrl={actionImageUrl} />

        </div>
      </Responsive>


      {showGallery &&
        <>
          <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 dark:bg-darkBg dark:border-2 dark:border-knight rounded-[2rem] px-0 md:px-24 py-12 w-[92vw] md:w-[80vw] h-[80vh]">
            <GoXCircle className="absolute top-4 right-4 text-3xl text-black dark:text-slate-500/80 cursor-pointer" onClick={closeGallery} />
            <Gallery images={photos} index={galleryIndex} className="absolute top-0 left-0 overscroll-y-none" />
          </div>

          {/* eslint-disable-next-line */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-slate-600/20 backdrop-blur-sm" onClick={closeGallery} role="modal" />
        </>
      }

    </div>
  );
};

export default Home;