"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

export function TopNav() {
   const router = useRouter();
   return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-bold">
         <div>icons-app</div>
         <div className="flex flex-row">
            <SignedOut>
               <SignInButton />
            </SignedOut>
            <SignedIn>
               <UploadButton
                  endpoint="iconUploader"
                  onClientUploadComplete={() => {
                     router.refresh();
                  }}
               />
               <UserButton />
            </SignedIn>
         </div>
      </nav>
   );
}
