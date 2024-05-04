import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

import { Inter } from "next/font/google";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-sans",
});

export const metadata = {
   title: "icons-app",
   description: "icons for macos dock",
   icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ClerkProvider>
         <html lang="en">
            <body
               className={`font-sans ${inter.variable} flex flex-col gap-4 bg-orange-50`}
            >
               <TopNav />
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}
