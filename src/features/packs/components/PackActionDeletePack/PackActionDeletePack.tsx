import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { DeleteModal } from "common/components";
import { packsThunks } from "features/packs/packs.slice";
import { RouterPaths } from "common/router/router";

type Props = {
  packId: string;
  packName: string;
  children: ReactNode;
};

export const PackActionDeletePack = ({ packId, packName, children }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setOpen(true);
  };

  const onSubmitDelete = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId }))
      .unwrap()
      .then(() => {
        navigate(RouterPaths.packs);
      })
      .catch(() => {});
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
