import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { UseFetchPackList } from "features/packs/hooks/useFetchPackList";
import {
  AddPackModal,
  Data,
  PackFilter,
  PacksPagination,
  PacksTable,
  ResetFilters,
  SearchPacks,
  SliderPacks,
} from "features/packs/components";
import { packsThunks } from "features/packs/packs.slice";
import s from "./style.module.css";

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const [packModal, setPackModal] = useState(false);

  const onPostPack = (data: Data) => {
    const payload = { ...data, deckCover: "" };
    dispatch(packsThunks.create(payload));
  };

  const onPackModal = (open: boolean) => {
    setPackModal(open);
  };

  return (
    <div className="container page">
      <UseFetchPackList />
      <AddPackModal
        open={packModal}
        onClose={onPackModal}
        onSave={onPostPack}
      />
      <div className={s.up}>
        <div className={s.title}>Packs list</div>
        <Button onClick={() => onPackModal(true)}>Add new pack</Button>
      </div>

      <div className={s.filters}>
        <SearchPacks />
        <PackFilter />
        <SliderPacks />
        <ResetFilters />
      </div>

      <PacksPagination />
      <PacksTable />
    </div>
  );
};
