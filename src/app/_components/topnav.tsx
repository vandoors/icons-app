"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
   return (
      <nav className="flex w-full items-center justify-between px-4 py-6 text-xl font-bold">
         <div>icons-app</div>
         <div className="flex flex-row items-center gap-4">
            <SignedOut>
               <SignInButton />
            </SignedOut>
            <SignedIn>
               <SimpleUploadButton />
               <UserButton />
            </SignedIn>
         </div>
      </nav>
   );
}
