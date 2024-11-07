import Link from "next/link";
import { Button } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import CloseButton from "@/components/close-button";


import { customMapImageUrl, getPageContent } from "@/lib/notion";
import { notionBlogConfig } from "@/config/site";
import BlogList from "@/components/blog-list";

export const revalidate = 0;

const Page = async () => {
  const { blocks } = await getPageContent(notionBlogConfig.blogParentId);

  return (
    <div className="px-4 pb-10">
      <div className="flex flex-col items-center mb-4 gap-2">
        <Link href="/">
          <CloseButton />
        </Link>
        <h1 className="text-2xl font-[500]">Gerald&lsquo;s Blog</h1>
      </div>

      <BlogList blocks={blocks} />

    </div>
  );
};

export default Page;