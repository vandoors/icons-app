import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

import { Inter } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "sonner";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-sans",
});

export const metadata = {
   title: "icons-app",
   description: "icons for macos dock",
   icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
   children,
   modal,
}: {
   children: React.ReactNode;
   modal: React.ReactNode;
}) {
   return (
      <ClerkProvider>
         <html lang="en">
            <NextSSRPlugin
               /**
                * The `extractRouterConfig` will extract **only** the route configs
                * from the router to prevent additional information from being
                * leaked to the client. The data passed to the client is the same
                * as if you were to fetch `/api/uploadthing` directly.
                */
               routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <body className={`font-sans ${inter.variable} bg-orange-50`}>
               <div className="grid h-screen grid-rows-[auto,1fr]">
                  <header>
                     <TopNav />
                  </header>
                  <main className="overflow-y-scroll">{children}</main>
               </div>
               {modal}
               <div id="modal-root" />
               <Toaster />
            </body>
         </html>
      </ClerkProvider>
   );
}
