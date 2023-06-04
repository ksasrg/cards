import { useAppSelector } from "app/hooks";
import s from "./style.module.css";
import { useSearchParams } from "react-router-dom";

export const PackFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const user_id = useAppSelector((state) => state.auth.profile?._id) as string;

  const isMy = params.user_id === user_id;

  const onMyFilter = () => {
    if (!isMy) {
      setSearchParams({ ...params, user_id });
    }
  };

  const onALLFilter = () => {
    if (isMy) {
      delete params["user_id"];
      setSearchParams({ ...params });
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
