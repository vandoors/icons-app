import FullPageIconView from "~/components/full-icon-page";

export default function IconPage({
   params: { id: iconId },
}: {
   params: { id: string };
}) {
   const idAsNumber = Number(iconId);
   if (isNaN(idAsNumber)) throw new Error("Invalid icon ID");

   return <FullPageIconView id={idAsNumber} />;
}
