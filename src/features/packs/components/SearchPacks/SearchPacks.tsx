import { Search } from "common/components";
import { packsActions } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import search from "assets/search-icon.svg";
import s from "./style.module.css";

export const SearchPacks = () => {
  const dispatch = useAppDispatch();
  const packName = useAppSelector((state) => state.packs.query.packName);

  const onSearchHandler = (packName: string) => {
    dispatch(packsActions.setQuery({ packName }));
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
