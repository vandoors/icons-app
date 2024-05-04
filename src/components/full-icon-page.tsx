import { getIcon } from "~/server/queries";

export default async function FullPageIconView(props: { id: number }) {
   const icon = await getIcon(props.id);

   return <img src={icon.url} alt={icon.name} />;
}
