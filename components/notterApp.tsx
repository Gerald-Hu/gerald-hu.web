import { Link } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

interface NotterAppProps {
  photoUrl: string;
}

const NotterApp = ({ photoUrl }: NotterAppProps) => {
  return (
    <div className="relative bg-cyan-200/80 w-full h-full group dark:bg-darkBg">

      <div className="top-6 md:top-8 left-6 md:left-12 font-oleo md:text-large absolute z-10 to-indigo-400 from-yellow-600 bg-clip-text text-transparent bg-gradient-to-r">
        Jot down stories of friends!
      </div>

      <div className="absolute top-16 md:top-32 -translate-y-1/4 left-10 md:left-16 transform -rotate-[10deg] rounded-3xl w-[80%] scale-[70%] shadow-zinc-500 shadow-lg">
        <Image
          alt="NotterApp"
          className="w-full h-full rounded-3xl object-contain"
          height={1280}
          src={'/Notter.png'}
          width={2259}
        />
      </div>

      <button className="absolute bg-white dark:bg-darkBg bottom-2 left-2 transition-all w-32 h-10 md:w-[2.75rem] md:h-[2.75rem] duration-500 ease-in-out md:group-hover:w-40 p-2 rounded-full hover:bg-default-100 border-2 border-transparent dark:border-knight">
        <div className="flex justify-center items-center">
          <Link
            isExternal
            color="foreground"
            href="https://apps.apple.com/us/app/notter/id6670778017"
          >
            <span className="text-sm md:text-medium text-nowrap md:hidden group-hover:block md:invisible group-hover:visible mr-1 animate-fade">
              App Store
            </span>
          </Link>
          <GoArrowUpRight />
        </div>
      </button>
    </div>
  );
};

export default NotterApp;
