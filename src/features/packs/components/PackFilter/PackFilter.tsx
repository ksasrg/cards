import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import s from "./style.module.css";

export const PackFilter = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const user_id = useAppSelector((state) => state.auth.profile?._id) as string;

  const isMy = params.user_id === user_id;

  const onMyFilter = () => {
    if (!isMy) {
      setSearchParams({ ...params, user_id });
      dispatch(packsThunks.get({ ...params, user_id }));
    }
  };

  const onALLFilter = () => {
    if (isMy) {
      delete params["user_id"];
      setSearchParams({ ...params });
      dispatch(packsThunks.get({ ...params }));
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
