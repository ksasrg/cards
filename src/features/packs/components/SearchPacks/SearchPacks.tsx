import { Search } from "common/components";
import s from "./style.module.css";
import search from "assets/search-icon.svg";
import { useSearchParams } from "react-router-dom";

export const SearchPacks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const packName = params.packName;

  const onSearchHandler = (packName: string) => {
    setSearchParams({ ...params, packName });
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
