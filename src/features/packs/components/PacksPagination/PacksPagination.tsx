import Pagination from "@mui/material/Pagination/Pagination";
import { useAppSelector } from "app/hooks";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export const PacksPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const page = useAppSelector((state) => state.packs.list.page);
  const pageCount = useAppSelector((state) => state.packs.list.pageCount);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.list.cardPacksTotalCount
  );

  const totalPages = Math.ceil(cardPacksTotalCount / +pageCount);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ ...params, page: page.toString() });
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = event.currentTarget.value;
    setSearchParams({ ...params, pageCount });
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
