import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "../packs.slice";
import { ArgGetPacks } from "../packs.api";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetPacks = Object.fromEntries(searchParams);
  const { min, max, page, pageCount, packName, user_id, sortPacks } = params;

  useEffect(() => {
    dispatch(packsThunks.get(params));
  }, [dispatch, min, max, page, pageCount, packName, user_id, sortPacks]); // eslint-disable-line react-hooks/exhaustive-deps
  // ignore setSearchParams

  return { min, max, page, pageCount, packName, user_id, sortPacks };
};
