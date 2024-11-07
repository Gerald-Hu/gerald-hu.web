import { Link } from "@nextui-org/react";
import { GoArrowUpRight } from "react-icons/go";
import CompanyLogo from "@/components/companyLogo";

interface CompanyProps {
  photoUrl: string;
}

const Company = ({ photoUrl }: CompanyProps) => {
  return (
    <div className="relative bg-indigo-200 w-full h-full group dark:bg-darkBg">

      <div className="top-4 md:top-10 left-10 font-oleo text-large absolute z-10 dark:text-blue-600">
        Seeking collabrations on Web/App development?
      </div>

      <div className="absolute top-[6.5rem] md:top-52 -translate-y-1/2 right-4 md:right-10 transform rounded-2xl w-[30%] opacity-90">
        <CompanyLogo/>
      </div>

      

      <button className="absolute bg-white dark:bg-darkBg bottom-2 left-2 transition-all w-48 h-10 md:w-[2.75rem] md:h-[2.75rem] duration-500 ease-in-out md:group-hover:w-48 p-2 rounded-full hover:bg-default-100 border-2 border-transparent dark:border-knight">
        <div className="flex justify-center items-center">
          <Link
            isExternal
            color="foreground"
            href="mailto:support@o-logn.com"
          >
            <span className="text-sm md:text-medium text-nowrap md:hidden group-hover:block md:invisible group-hover:visible mr-1 animate-fade">
              OLOGN INC.
            </span>
          </Link>
          <GoArrowUpRight />
        </div>
      </button>
    </div>
  );
};

export default Company;
