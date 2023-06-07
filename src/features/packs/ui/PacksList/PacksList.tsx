import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { packsThunks } from "features/packs/packs.slice";
import s from "./style.module.css";

export function PacksList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  const [packModal, setPackModal] = useState(false);

  useFetchPackList();

  const onPostPack = (data: Data) => {
    const payload = { ...data, deckCover: "" };
    const query = { pageCount: pageCount.toString() };
    setSearchParams(query);
    dispatch(packsThunks.create(payload));
  };

  const onPackModal = (open: boolean) => {
    setPackModal(open);
  };

  const onChange = (query: PaginationQuery) => {
    setSearchParams({ ...params, ...(query as Record<string, string>) });
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
