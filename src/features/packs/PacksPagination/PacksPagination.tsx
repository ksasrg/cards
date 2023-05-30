import Pagination from "@mui/material/Pagination/Pagination";
import { useAppSelector } from "app/hooks";
import { ChangeEvent } from "react";

type PropsType = {
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
  onPageCountChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const PacksPagination = (props: PropsType) => {
  const { onPageChange, onPageCountChange } = props;
  const pageCount = useAppSelector((state) => state.packs.packs.pageCount);
  const page = useAppSelector((state) => state.packs.packs.page);
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.packs.cardPacksTotalCount
  );
  const totalPages = Math.ceil(cardPacksTotalCount / pageCount);

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <Pagination
        count={totalPages || 0}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={onPageChange}
        sx={{ marginRight: "15px" }}
      />
      Show
      <select
        name=""
        id=""
        style={{ margin: "0 15px" }}
        onChange={onPageCountChange}
        value={pageCount}
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
