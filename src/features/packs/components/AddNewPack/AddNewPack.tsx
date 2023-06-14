import Button from "@mui/material/Button/Button";
import { AddPackModal, Data } from "../AddPackModal/AddPackModal";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";

export const AddNewPack = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [showModal, setShowModal] = useState(false);

  const onPackModal = (open: boolean) => {
    setShowModal(open);
  };

  const onPostPack = (data: Data) => {
    const payload = { ...data, deckCover: "" };
    let query = {};

    if (params.pageCount) {
      query = { pageCount: params.pageCount };
    }

    setSearchParams(query);
    dispatch(packsThunks.create({ payload, query }));
  };

  return (
    <>
      <Button onClick={() => onPackModal(true)}>Add new pack</Button>
      <AddPackModal
        open={showModal}
        title="Add new pack"
        onClose={onPackModal}
        onSave={onPostPack}
      />
    </>
  );
};
