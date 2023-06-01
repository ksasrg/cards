import { useAppDispatch } from "app/hooks";
import resetIcon from "assets/resetfilter.svg";
import { packsActions } from "features/packs/packs.slice";
import s from "./style.module.css";

export const ResetFilters = () => {
  const dispatch = useAppDispatch();

  const resetFilterHandler = () => {
    dispatch(
      packsActions.setQuery({
        query: {
          // pageCount not modifying
          page: undefined,
          packName: undefined,
          sortPacks: undefined,
          user_id: undefined,
          max: undefined,
          min: undefined,
        },
      })
    );
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
