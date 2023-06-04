import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchPackList } from "features/packs/hooks/useFetchPackList";
import { packsThunks } from "features/packs/packs.slice";
import { PacksTable } from "features/packs/components/PacksTable/PacksTable";
import { SearchPacks } from "features/packs/components/SearchPacks/SearchPacks";
import { PackFilter } from "features/packs/components/PackFilter/PackFilter";
import { ResetFilters } from "features/packs/components/ResetFilters/ResetFilters";
import { SliderPacks } from "features/packs/components/SliderPacks/SliderPacks";
import { AppPagination, PaginationQuery } from "common/components";
import { useSearchParams } from "react-router-dom";
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

  useFetchPackList();

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload));
  };

  const onChange = (query: PaginationQuery) => {
    setSearchParams({ ...params, ...(query as Record<string, string>) });
  };

  return (
    <div className="container page">
      <div className={s.up}>
        <div className={s.title}>Packs list</div>
        <Button onClick={onAddPackHandler}>Add new pack</Button>
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
