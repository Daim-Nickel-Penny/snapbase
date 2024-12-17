import { Modal } from "../../modal";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) return <div>Invalid photo ID</div>;

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
