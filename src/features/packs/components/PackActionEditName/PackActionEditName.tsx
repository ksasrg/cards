import editIconMini from "assets/editIconMini.svg";
import { AddPackModal, Data } from "../AddPackModal/AddPackModal";
import { useState } from "react";
import { CardPack, packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";

type Props = {
  pack: CardPack;
};

export const PackActionEditName = ({ pack }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [showModal, setShowModal] = useState(false);

  const onPackModal = (open: boolean) => {
    setShowModal(open);
  };

  const onPostPack = (data: Data) => {
    const payload = { ...data, _id: pack._id, deckCover: "" };
    let query = {};

    if (params.pageCount) {
      query = { pageCount: params.pageCount };
    }

    dispatch(packsThunks.change({ payload, query }));
  };

  return (
    <>
      <AddPackModal
        open={showModal}
        title="Edit pack"
        name={pack.name}
        IsPrivate={pack.private}
        onClose={onPackModal}
        onSave={onPostPack}
      />
      <img src={editIconMini} alt="edit" onClick={() => onPackModal(true)} />
    </>
  );
};
