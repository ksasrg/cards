import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "../packs.slice";
import { ArgGetPacks } from "../packs.api";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetPacks = Object.fromEntries(searchParams);

  useEffect(() => {
    dispatch(packsThunks.get(params));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
