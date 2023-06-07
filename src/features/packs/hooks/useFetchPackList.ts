import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { packsThunks } from "../packs.slice";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const forceFetch = useAppSelector((state) => state.packs.forceFetch);
  const min = useAppSelector((state) => state.packs.query.min);
  const max = useAppSelector((state) => state.packs.query.max);
  const page = useAppSelector((state) => state.packs.query.page);
  const pageCount = useAppSelector((state) => state.packs.query.pageCount);
  const packName = useAppSelector((state) => state.packs.query.packName);
  const user_id = useAppSelector((state) => state.packs.query.user_id);
  const sortPacks = useAppSelector((state) => state.packs.query.sortPacks);

  const query = { min, max, page, pageCount, packName, user_id, sortPacks };

  useEffect(
    () => {
      dispatch(packsThunks.get(query));
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      dispatch,
      min,
      max,
      page,
      pageCount,
      packName,
      user_id,
      sortPacks,
      forceFetch,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};
