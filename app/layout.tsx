import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";
import LoadingContextProvider from "@/context/loadingContextProvider";
import Loading from "@/components/loading";

import { siteConfig } from "@/config/site";
import { fontOleoScript, fontUbuntu } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en" style={{ background: "black" }}>
      <head>
      </head>
      <body
        className={clsx(
          fontUbuntu.className,
          "tracking-wide",
          fontOleoScript.variable
        )}
      >
        <Providers themeProps={{ attribute: "class" }}>
          <div className="relative flex flex-col bg-[#f6f2f2] dark:bg-[#0b0f11] overflow-y-auto scrollbar-hide min-h-screen">

            <LoadingContextProvider>
              <Loading />
              <main className="container mx-auto max-w-7xl pt-8 pb-[25px] flex flex-col">
                {children}
                <Analytics />
              </main>
            </LoadingContextProvider>

          </div>
        </Providers>
      </body>
    </html>
  );
}
