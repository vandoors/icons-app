"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
   return (
      <nav className="flex w-full items-center justify-between px-4 py-6 text-xl font-bold">
         <div>macOS icons</div>
         <div className="flex flex-row items-center gap-4">
            <SignedOut>
               <SignInButton>
                  <button className="cursor-pointer rounded-2xl bg-stone-800 bg-opacity-5 p-4 text-base font-medium transition-all ease-in-out hover:bg-opacity-15">
                     Sign In
                  </button>
               </SignInButton>
            </SignedOut>
            <SignedIn>
               <SimpleUploadButton />
               <UserButton />
            </SignedIn>
         </div>
      </nav>
   );
}
