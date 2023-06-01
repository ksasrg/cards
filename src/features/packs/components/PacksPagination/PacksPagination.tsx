import Pagination from "@mui/material/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ChangeEvent } from "react";
import { packsActions } from "../../packs.slice";

export const PacksPagination = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  const totalPages = Math.ceil(cardPacksTotalCount / +pageCount);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(packsActions.setQuery({ query: { page } }));
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = +event.currentTarget.value;
    dispatch(packsActions.setQuery({ query: { pageCount } }));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <Pagination
        count={totalPages || 0}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={onPageChangeHandler}
        sx={{ marginRight: "15px" }}
      />
      Show
      <select
        name=""
        id=""
        style={{ margin: "0 15px" }}
        onChange={onPageCountChangeHandler}
        value={pageCount}
        disabled={isLoading}
      >
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      Cards per Page
    </div>
  );
};
