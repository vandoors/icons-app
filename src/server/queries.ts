import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { icons } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export async function getIcon(id: number) {
   const icon = await db.query.icons.findFirst({
      where: (model, { eq }) => eq(model.id, id),
   });

   if (!icon) throw new Error("Icon not found");

   return icon;
}

export async function deleteIcon(id: number) {
   const user = auth();
   if (!user.userId) throw new Error("Unauthorized");

   await db
      .delete(icons)
      .where(and(eq(icons.id, id), eq(icons.userId, user.userId)));

   redirect("/");
}
