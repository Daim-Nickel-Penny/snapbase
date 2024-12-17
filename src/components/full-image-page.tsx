import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const img = await getImage(props.id);

  return <img src={img.url} className="w-96" />;
}
