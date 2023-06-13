import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "../packs.slice";
import { ArgGetPacks } from "../packs.api";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetPacks = Object.fromEntries(searchParams);
  const checkUpdate = useAppSelector((state) => state.packs.checkUpdate);
  const editUpdate = useAppSelector((state) => state.packs.editUpdate);

  useEffect(() => {
    dispatch(packsThunks.get(params));
  }, [checkUpdate, editUpdate]); // eslint-disable-line react-hooks/exhaustive-deps
};
