import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./style.module.css";
import { packsActions } from "features/packs/packs.slice";

export const PackFilter = () => {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.profile?._id);
  const queryUserId = useAppSelector((state) => state.packs.query.user_id);

  const isMy = queryUserId === user_id;

  const onMyFilter = () => {
    if (!isMy) {
      dispatch(packsActions.setQuery({ query: { user_id } }));
    }
  };

  const onALLFilter = () => {
    if (isMy) {
      dispatch(packsActions.setQuery({ query: { user_id: undefined } }));
    }
  };

  return (
    <div>
      <div className={s.title}>Show packs cards</div>
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
