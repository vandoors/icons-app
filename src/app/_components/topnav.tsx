import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {
   return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-bold">
         <div>icons-app</div>
         <div>
            <SignedOut>
               <SignInButton />
            </SignedOut>
            <SignedIn>
               <UserButton />
            </SignedIn>
         </div>
      </nav>
   );
}
