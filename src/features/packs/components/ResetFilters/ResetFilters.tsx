import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { packsThunks } from "features/packs/packs.slice";
import resetIcon from "assets/resetfilter.svg";
import s from "./style.module.css";

export const ResetFilters = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const resetFilterHandler = () => {
    const query = {} as Record<string, string>;
    params.pageCount && (query["pageCount"] = params.pageCount);
    setSearchParams(query);
    dispatch(packsThunks.get(query));
  };

  return (
    <div className={s.block}>
      <img
        src={resetIcon}
        alt="Reset filter"
        onClick={resetFilterHandler}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
