import Button from "@mui/material/Button/Button";
import { useAppDispatch } from "app/hooks";
import { useFetchPackList } from "features/packs/hooks/useFetchPackList";
import { packsThunks } from "features/packs/packs.slice";
import { PacksPagination } from "features/packs/components/PacksPagination/PacksPagination";
import { PacksTable } from "features/packs/components/PacksTable/PacksTable";
import { SearchPacks } from "features/packs/components/SearchPacks/SearchPacks";
import { PackFilter } from "features/packs/components/PackFilter/PackFilter";
import { ResetFilters } from "features/packs/components/ResetFilters/ResetFilters";
import { SliderPacks } from "features/packs/components/SliderPacks/SliderPacks";
import s from "./style.module.css";

export function PacksList() {
  const dispatch = useAppDispatch();

  useFetchPackList();

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload));
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

      <PacksPagination />
      <PacksTable />
    </div>
  );
}
