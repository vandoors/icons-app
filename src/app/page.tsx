import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getIcons } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
   const icons = await getIcons();

   return (
      <main>
         <div className="flex flex-wrap justify-center gap-4">
            {icons.map((image) => (
               <div key={image.url} className="w-48">
                  <Image
                     src={image.url}
                     style={{ objectFit: "contain" }}
                     width={1024}
                     height={1024}
                     alt={image.name}
                  />
                  <div>{image.name}</div>
               </div>
            ))}
         </div>
      </main>
   );
}
