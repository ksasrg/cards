import Button from "@mui/material/Button/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchPackList } from "features/packs/hooks/useFetchPackList";
import { AppPagination } from "common/components";
import { Select } from "common/components/AppPagination/Select";
import { packsThunks } from "features/packs/packs.slice";
import {
  AddPackModal,
  Data,
  PackFilter,
  PacksTable,
  ResetFilters,
  SearchPacks,
  SliderPacks,
} from "features/packs/components";
import s from "./style.module.css";

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  const [showModal, setShowModal] = useState(false);

  useFetchPackList();

  const onPostPack = (data: Data) => {
    const payload = { ...data, deckCover: "" };
    let query = {};

    if (params.pageCount) {
      query = { pageCount: params.pageCount };
    }

    setSearchParams(query);
    dispatch(packsThunks.create({ payload, query }));
  };

  const onPackModal = (open: boolean) => {
    setShowModal(open);
  };

  const onPage = (page: number) => {
    const query = { ...params, page: page.toString() };
    setSearchParams(query);
    dispatch(packsThunks.get(query));
  };

  const onPageCount = (pageCount: number) => {
    const query = { ...params, page: "1", pageCount: pageCount.toString() };
    setSearchParams(query);
    dispatch(packsThunks.get(query));
  };

  return (
    <div className="container page">
      <AddPackModal
        open={showModal}
        title="Add new pack"
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

      <div className={s.pagination}>
        <AppPagination {...{ page, pageCount, totalCount, onPage }} />
        <Select pageCount={pageCount} onChange={onPageCount} />
      </div>

      <PacksTable />
    </div>
  );
};
