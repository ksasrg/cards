import { Search } from "common/components";
import s from "./style.module.css";
import search from "assets/search-icon.svg";
import { useSearchParams } from "react-router-dom";

export const SearchCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardQuestion = params.cardQuestion;

  const onSearchHandler = (cardQuestion: string) => {
    setSearchParams({ ...params, cardQuestion });
  };

  return (
    <div>
      <div className={s.title}>Search</div>
      <div className={s.search}>
        <img src={search} alt="" />
        <Search
          onSearch={onSearchHandler}
          value={cardQuestion || ""}
          placeholder="Provide your text"
        />
      </div>
    </div>
  );
};
