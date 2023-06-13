import { AddPackModal, Data } from "../AddPackModal/AddPackModal";
import { ReactNode, useState } from "react";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "app/hooks";

type Props = {
  packId: string;
  packName?: string;
  isPrivate?: boolean;
  deckCover?: string;
  children: ReactNode;
};

export const PackActionEditName = (props: Props) => {
  const { packId, packName, isPrivate, deckCover = "", children } = props;
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const onPackModal = (open: boolean) => {
    setShowModal(open);
  };

  const onPostPack = (data: Data) => {
    const payload = { ...data, _id: packId, deckCover };
    dispatch(packsThunks.change({ payload }));
  };

  return (
    <>
      <AddPackModal
        open={showModal}
        title="Edit pack"
        name={packName}
        isPrivate={isPrivate}
        onClose={onPackModal}
        onSave={onPostPack}
      />
      <span onClick={() => onPackModal(true)}>{children}</span>
    </>
  );
};
