import { useSearchParams } from "react-router-dom";
import resetIcon from "assets/resetfilter.svg";
import s from "./style.module.css";

export const ResetFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const resetFilterHandler = () => {
    setSearchParams({ pageCount: params.pageCount });
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
