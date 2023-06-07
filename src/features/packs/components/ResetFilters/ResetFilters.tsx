import resetIcon from "assets/resetfilter.svg";
import s from "./style.module.css";
import { useAppDispatch } from "app/hooks";
import { packsActions } from "features/packs/packs.slice";

export const ResetFilters = () => {
  const dispatch = useAppDispatch();

  const resetFilterHandler = () => {
    dispatch(
      packsActions.setQuery({
        min: undefined,
        max: undefined,
        packName: undefined,
        page: undefined,
        // pageCount: undefined,
        sortPacks: undefined,
        user_id: undefined,
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
