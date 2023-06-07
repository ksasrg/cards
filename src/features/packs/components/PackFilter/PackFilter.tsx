import { useAppDispatch, useAppSelector } from "app/hooks";
import { packsActions } from "features/packs/packs.slice";
import s from "./style.module.css";

export const PackFilter = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.profile?._id);
  const user_idQuery = useAppSelector((state) => state.packs.query.user_id);

  const isMy = user_idQuery === user_id;

  const onMyFilter = () => {
    if (!isMy) {
      dispatch(packsActions.setQuery({ user_id }));
    }
  };

  const onALLFilter = () => {
    if (isMy) {
      dispatch(packsActions.setQuery({ user_id: "" }));
    }
  };

  return (
    <div>
      <div className={s.title}>Show card packs</div>
      <div className={s.filter}>
        <div onClick={onMyFilter} className={`${s.button} ${isMy && s.active}`}>
          My
        </div>
        <div
          onClick={onALLFilter}
          className={`${s.button} ${!isMy && s.active}`}
        >
          All
        </div>
      </div>
    </div>
  );
};
