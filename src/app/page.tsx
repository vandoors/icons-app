import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
   const icons = await db.query.icons.findMany({
      orderBy: (model, { desc }) => desc(model.createdAt),
   });

   return (
      <main>
         <div className="flex flex-wrap gap-4">
            {icons.map((image, index) => (
               <div key={image.id + "-" + index} className="w-48">
                  <img src={image.url} />
                  <div>{image.name}</div>
               </div>
            ))}
         </div>
      </main>
   );
}
