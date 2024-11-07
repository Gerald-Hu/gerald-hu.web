'use client'
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { notionBlogConfig } from "@/config/site";
import type { BlockMap, Block } from "notion-types";
import { useContext, useEffect } from "react";
import {LoadingContext} from "@/context/loadingContextProvider";

interface BlogProps{
  blocks: BlockMap
}

const BlogList = ({ blocks }: BlogProps) => {

  const context = useContext(LoadingContext);
  if (!context) throw new Error("LoadingContext must be used within LoadingContextProvider");
  const { setLoading } = context;
  
  useEffect(()=>{
    setLoading(false);
  },[])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(blocks).map(([key, value]) => {
          if (key !== notionBlogConfig.blogParentId && value.value.parent_id === notionBlogConfig.collectionID) {
            return (
              <Link key={key} href={`/blog/${key}`} onClick={()=>{setLoading(true);}}>
                <Card className="dark:bg-darkBg dark:border-2 dark:border-knight rounded-[2rem]">
                  <CardBody className="p-0">
                    <Image
                      alt="cover"
                      className="rounded-b-none object-cover h-[200px]"
                      height={500}
                      src={customMapImageUrl(
                        value.value.format?.page_cover,
                        value.value
                      )}
                      width={500}
                    />
                  </CardBody>
                  <CardFooter className="flex justify-between">
                    <h3 className="font-[500] text-lg">
                      {value.value.properties?.title[0][0]}
                    </h3>
                    <h3 className="text-sm">
                      {new Date(value.value.created_time).toDateString()}
                    </h3>
                  </CardFooter>
                </Card>
              </Link>
            );
          }
        })}
      </div>
  );
};

export default BlogList;

const customMapImageUrl = (url: string, block: Block): string => {
  if (!url) {
    throw new Error("URL can't be empty");
  }

  if (url.startsWith("data:")) {
    return url;
  } // more recent versions of notion don't proxy unsplash images

  if (url.startsWith("https://images.unsplash.com")) {
    return url;
  }

  try {
    const u = new URL(url);

    if (
      u.pathname.startsWith("/secure.notion-static.com") &&
      u.hostname.endsWith(".amazonaws.com")
    ) {
      if (
        u.searchParams.has("X-Amz-Credential") &&
        u.searchParams.has("X-Amz-Signature") &&
        u.searchParams.has("X-Amz-Algorithm")
      ) {
        // if the URL is already signed, then use it as-is
        url = u.origin + u.pathname;
      }
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }

  url = `https://www.notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`;

  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === "space" ? "block" : block.parent_table;

  if (table === "collection" || table === "team") {
    table = "block";
  }
  notionImageUrlV2.searchParams.set("table", table);
  notionImageUrlV2.searchParams.set("id", block.id);
  notionImageUrlV2.searchParams.set("cache", "v2");

  url = notionImageUrlV2.toString();

  return url;
};