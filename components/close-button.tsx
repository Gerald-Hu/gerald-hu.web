'use client'
import { Button } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { LoadingContext } from "@/context/loadingContextProvider";
import { useContext } from "react";

const CloseButton = () => {

  const context = useContext(LoadingContext);
  if (!context) throw new Error("LoadingContext must be used within LoadingContextProvider");
  const { setLoading } = context;

  return (
    <Button
      isIconOnly
      className="dark:border-knight dark:bg-transparent dark:border-2 bg-[#ece7e7] border-0"
      radius="full"
      variant="bordered"
      onClick={() => { setLoading(true); }}
    >
      <RxCross2 />
    </Button>
  );
}

export default CloseButton;