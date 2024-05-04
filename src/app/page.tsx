import Link from "next/link";
import { db } from "~/server/db";
import { getIcons } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
   const icons = await getIcons();

   return (
      <main>
         <div className="flex flex-wrap gap-4">
            {icons.map((image) => (
               <div key={image.url} className="w-48">
                  <img src={image.url} />
                  <div>{image.name}</div>
               </div>
            ))}
         </div>
      </main>
   );
}
