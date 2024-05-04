import { getIcon } from "~/server/queries";

export default async function FullPageIconView(props: { id: number }) {
   const icon = await getIcon(props.id);

   return (
      <div className="flex h-full w-full min-w-0">
         <div className="flex flex-shrink items-center justify-center">
            <img
               src={icon.url}
               alt={icon.name}
               className="max-w-2xl object-contain"
            />
         </div>
         <div className="flex w-48 flex-shrink-0 flex-col items-center justify-center">
            <div className="text-xl font-bold">{icon.name}</div>
         </div>
      </div>
   );
}
