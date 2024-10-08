import Image from "next/image";
import Link from "next/link";
import { getIcons } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
   const icons = await getIcons();

   return (
      <div className="flex flex-wrap justify-center gap-4 px-2 py-4">
         {icons.map((icon) => (
            <div key={icon.url} className="w-48 overflow-hidden">
               <Link href={`/icon/${icon.id}`}>
                  <Image
                     src={icon.url}
                     style={{ objectFit: "contain" }}
                     width={1024}
                     height={1024}
                     alt={icon.name}
                  />
               </Link>
            </div>
         ))}
      </div>
   );
}
