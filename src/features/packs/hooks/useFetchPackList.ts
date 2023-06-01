import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "../packs.slice";

export const useFetchPackList = () => {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const min = useAppSelector((state) => state.packs.query.min);
  const max = useAppSelector((state) => state.packs.query.max);
  const page = useAppSelector((state) => state.packs.query.page);
  const user_id = useAppSelector((state) => state.packs.query.user_id);
  const packName = useAppSelector((state) => state.packs.query.packName);
  const pageCount = useAppSelector((state) => state.packs.query.pageCount);
  const sortPacks = useAppSelector((state) => state.packs.query.sortPacks);

  useEffect(() => {
    const searchParams = {} as Record<string, string>;
    min && (searchParams["min"] = min.toString());
    max && (searchParams["max"] = max.toString());
    page && (searchParams["page"] = page.toString());
    user_id && (searchParams["user_id"] = user_id.toString());
    packName && (searchParams["packName"] = packName.toString());
    pageCount && (searchParams["pageCount"] = pageCount.toString());
    sortPacks && (searchParams["sortPacks"] = sortPacks.toString());
    setSearchParams(searchParams);

    dispatch(packsThunks.get());
  }, [dispatch, min, max, page, pageCount, packName, user_id, sortPacks]); // eslint-disable-line react-hooks/exhaustive-deps
  // ignore setSearchParams

  return { min, max, page, pageCount, packName, user_id, sortPacks };
};
