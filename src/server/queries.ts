import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getIcons() {
   const icons = await db.query.icons.findMany({
      orderBy: (model, { desc }) => desc(model.createdAt),
   });

   return icons;
}

export async function getMyIcons() {
   const user = auth();
   if (!user.userId) throw new Error("Unauthorized");

   const icons = await db.query.icons.findMany({
      where: (model, { eq }) => eq(model.userId, user.userId),
      orderBy: (model, { desc }) => desc(model.createdAt),
   });

   return icons;
}
