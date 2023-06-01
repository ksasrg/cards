import Button from "@mui/material/Button/Button";
import { useAppDispatch } from "app/hooks";
import { packsThunks } from "../../packs.slice";
import { PacksTable } from "../../components/PacksTable/PacksTable";
import { PacksPagination } from "../../components/PacksPagination/PacksPagination";
import { useFetchPackList } from "../../hooks/useFetchPackList";
import { SearchPacks } from "../../components/SearchPacks/SearchPacks";
import { PackFilter } from "features/packs/components/PackFilter/PackFilter";
import { ResetFilters } from "features/packs/components/ResetFilters/ResetFilters";
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
        <div>number of cards</div>
        <ResetFilters />
      </div>

      <PacksPagination />
      <PacksTable />
    </div>
  );
}
