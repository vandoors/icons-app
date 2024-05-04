import { clerkClient } from "@clerk/nextjs/server";
import { getIcon } from "~/server/queries";

export default async function FullPageIconView(props: { id: number }) {
   const icon = await getIcon(props.id);
   const uploaderInfo = await clerkClient.users.getUser(icon.userId);

   return (
      <div className="flex h-full w-full min-w-0">
         <div className="flex flex-shrink items-center justify-center">
            <img
               src={icon.url}
               alt={icon.name}
               className="max-w-2xl object-contain"
            />
         </div>
         <div className="flex w-48 flex-shrink-0 flex-col justify-center">
            <span className="text-xl font-bold">{icon.name}</span>
            <span className="text-sm">Uploaded by {uploaderInfo.fullName}</span>
         </div>
      </div>
   );
}
