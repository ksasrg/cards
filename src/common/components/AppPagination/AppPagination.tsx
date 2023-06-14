import Pagination from "@mui/material/Pagination/Pagination";
import { ChangeEvent } from "react";

type Props = {
  page: number;
  pageCount: number;
  totalCount: number;
  onPage: (page: number) => void;
};

export const AppPagination = (props: Props) => {
  const { page, pageCount, totalCount, onPage } = props;

  const totalPages = Math.ceil(totalCount / +pageCount);

  const onPageHandler = (event: ChangeEvent<unknown>, page: number) => {
    onPage(page);
  };

  return (
    <Pagination
      count={totalPages || 0}
      variant="outlined"
      shape="rounded"
      page={page || 0}
      onChange={onPageHandler}
      sx={{ marginRight: "15px" }}
    />
  );
};
