import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { DeleteModal } from "common/components";
import { CardPack, packsThunks } from "features/packs/packs.slice";
import trash from "assets/trash.svg";

type Props = {
  pack: CardPack;
};

export const PackActionDeletePack = ({ pack }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setOpen(true);
  };

  const onSubmitDelete = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId, query: params }));
  };

  const onCloseDeleteModal = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteModal
        open={open}
        id={pack._id}
        title="Delete Pack"
        onClose={onCloseDeleteModal}
        onDelete={onSubmitDelete}
      >
        Do you really want to remove <b>"{pack.name}"</b> pack? All cards will
        be deleted.
      </DeleteModal>
      <img src={trash} alt="delete" onClick={onDelete} />
    </>
  );
};
