import { useAppDispatch, useAppSelector } from "app/hooks";
import { packsActions } from "../packs.slice";
import { Search } from "../Search/Search";

export const SearchPacks = () => {
  const dispatch = useAppDispatch();
  const packName = useAppSelector((state) => state.packs.query.packName);

  const onSearchHandler = (packName: string) => {
    dispatch(packsActions.setQuery({ query: { packName, page: 1 } }));
  };

  return <Search onSearch={onSearchHandler} value={packName || ""} />;
};
