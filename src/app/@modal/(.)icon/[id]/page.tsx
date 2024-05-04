import Image from "next/image";
import { getIcon } from "~/server/queries";

export default async function IconModal({
   params: { id: iconId },
}: {
   params: { id: string };
}) {
   const idAsNumber = Number(iconId);
   if (isNaN(idAsNumber)) throw new Error("Invalid icon ID");

   const icon = await getIcon(idAsNumber);

   return (
      <div>
         <img src={icon.url} alt={icon.name} />
      </div>
   );
}
