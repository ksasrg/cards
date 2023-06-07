import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchPackList } from "features/packs/hooks/useFetchPackList";
import { AppPagination, PaginationQuery } from "common/components";
import {
  AddPackModal,
  Data,
  PackFilter,
  PacksTable,
  ResetFilters,
  SearchPacks,
  SliderPacks,
} from "features/packs/components";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import s from "./style.module.css";

export function PacksList() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  console.log("PacksList");
  console.log(page, pageCount, totalCount);

  const [packModal, setPackModal] = useState(false);

  useFetchPackList();

  const onPostPack = (data: Data) => {
    const payload = { ...data, deckCover: "" };
    dispatch(packsThunks.create(payload));
  };

  const onPackModal = (open: boolean) => {
    setPackModal(open);
  };

  const onChange = (query: PaginationQuery) => {
    dispatch(packsActions.setQuery(query));
  };

  return (
    <div className="container page">
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

      <AppPagination onChange={onChange} {...{ page, pageCount, totalCount }} />
      <PacksTable />
    </div>
  );
}
