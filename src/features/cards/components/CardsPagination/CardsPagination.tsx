import Pagination from "@mui/material/Pagination/Pagination";
import { useAppSelector } from "app/hooks";
import { ChangeEvent } from "react";

export type PaginationQuery = {
  page?: number;
  pageCount?: number;
};

type Props = {
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  onChange: (query: PaginationQuery) => void;
};

export const CardsPagination = (props: Props) => {
  const { page, pageCount, cardsTotalCount, onChange } = props;
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const totalPages = Math.ceil(cardsTotalCount / +pageCount);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    onChange({ page });
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = +event.currentTarget.value;
    onChange({ pageCount });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <Pagination
        count={totalPages || 0}
        variant="outlined"
        shape="rounded"
        page={page || 0}
        onChange={onPageChangeHandler}
        sx={{ marginRight: "15px" }}
      />
      Show
      <select
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
      per Page
    </div>
  );
};
