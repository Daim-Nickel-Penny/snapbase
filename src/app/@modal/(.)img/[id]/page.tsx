import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) return <div>Invalid photo ID</div>;

  const img = await getImage(idAsNumber);

  return (
    <div>
      <img src={img.url} className="h-full w-full" />
    </div>
  );
}
