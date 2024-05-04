import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { icons } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   // Define as many FileRoutes as you like, each with a unique routeSlug
   iconUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 10 } })
      // Set permissions and file types for this FileRoute
      .middleware(async ({ req }) => {
         // This code runs on your server before upload
         const user = auth();
         if (!user.userId) throw new UploadThingError("Unauthorized");

         const fullUserData = await clerkClient.users.getUser(user.userId);

         // If you throw, the user will not be able to upload
         if (!user) throw new UploadThingError("Unauthorized");

         // Whatever is returned here is accessible in onUploadComplete as `metadata`
         return { userId: user.userId };
      })
      .onUploadComplete(async ({ metadata, file }) => {
         await db.insert(icons).values({
            name: file.name,
            url: file.url,
            userId: metadata.userId,
         });

         // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
         return { uploadedBy: metadata.userId };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
