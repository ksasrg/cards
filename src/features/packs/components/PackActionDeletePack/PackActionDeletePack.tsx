import { ReactNode, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { DeleteModal } from "common/components";
import { packsThunks } from "features/packs/packs.slice";

type Props = {
  packId: string;
  packName: string;
  children: ReactNode;
};

export const PackActionDeletePack = ({ packId, packName, children }: Props) => {
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
        id={packId}
        title="Delete Pack"
        onClose={onCloseDeleteModal}
        onDelete={onSubmitDelete}
      >
        Do you really want to remove <b>"{packName}"</b> pack? All cards will be
        deleted.
      </DeleteModal>
      <span onClick={onDelete}>{children}</span>
    </>
  );
};
