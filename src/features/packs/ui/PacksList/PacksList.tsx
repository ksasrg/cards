import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchPackList } from "features/packs/hooks/useFetchPackList";
import { AppPagination } from "common/components";
import { Select } from "common/components/Select/Select";
import { packsThunks } from "features/packs/packs.slice";
import { AddNewPack } from "features/packs/components/AddNewPack/AddNewPack";
import {
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

  useFetchPackList();

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
      <div className={s.up}>
        <div className={s.title}>Packs list</div>
        <AddNewPack />
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
