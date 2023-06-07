import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "../packs.slice";
import { ArgGetPacks } from "../packs.api";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetPacks = Object.fromEntries(searchParams);
  const { min, max, page, pageCount, packName, user_id, sortPacks } = params;
  const forceFetch = useAppSelector((state) => state.packs.forceFetch);

  useEffect(
    () => {
      dispatch(packsThunks.get(params));
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
