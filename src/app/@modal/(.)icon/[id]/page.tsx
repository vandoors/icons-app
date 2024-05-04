import { Modal } from "./modal";
import FullPageIconView from "~/components/full-icon-page";

export default function IconModal({
   params: { id: iconId },
}: {
   params: { id: string };
}) {
   const idAsNumber = Number(iconId);
   if (isNaN(idAsNumber)) throw new Error("Invalid icon ID");

   return (
      <Modal>
         <FullPageIconView id={idAsNumber} />
      </Modal>
   );
}
