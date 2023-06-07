import { Search } from "common/components";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "app/hooks";
import search from "assets/search-icon.svg";
import s from "./style.module.css";

export const SearchPacks = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const packName = params.packName;

  const onSearchHandler = (packName: string) => {
    setSearchParams({ ...params, packName });
    dispatch(packsThunks.get({ ...params, packName }));
  };

  return (
    <div>
      <div className={s.title}>Search</div>
      <div className={s.search}>
        <img src={search} alt="" />
        <Search
          onSearch={onSearchHandler}
          value={packName || ""}
          placeholder="Provide your text"
        />
      </div>
    </div>
  );
};
