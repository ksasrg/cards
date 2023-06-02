import { useAppDispatch, useAppSelector } from "app/hooks";
import { Search } from "common/components/Search/Search";
import { packsActions } from "features/packs/packs.slice";
import s from "./style.module.css";
import search from "assets/search-icon.svg";

export const SearchPacks = () => {
  const dispatch = useAppDispatch();
  const packName = useAppSelector((state) => state.packs.query.packName);

  const onSearchHandler = (packName: string) => {
    dispatch(packsActions.setQuery({ query: { packName, page: 1 } }));
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
