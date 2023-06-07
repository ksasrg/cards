import { useAppDispatch, useAppSelector } from "app/hooks";
import { AppPagination, PaginationQuery } from "common/components";
import { packsActions } from "features/packs/packs.slice";

export const PacksPagination = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  const onChange = (query: PaginationQuery) => {
    dispatch(packsActions.setQuery(query));
  };
  return (
    <AppPagination onChange={onChange} {...{ page, pageCount, totalCount }} />
  );
};
