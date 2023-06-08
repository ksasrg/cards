import { Search } from "common/components";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import search from "assets/search-icon.svg";
import s from "./style.module.css";

export const SearchCards = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardQuestion = params.cardQuestion;

  const onSearchHandler = (cardQuestion: string) => {
    setSearchParams({ ...params, cardQuestion });
    dispatch(cardsThunks.get({ ...params, cardQuestion }));
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
