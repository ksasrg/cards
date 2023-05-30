import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";

import { ChangeEvent, useEffect, useState } from "react";
import { packsThunks } from "../packs.slice";
import { PacksTable } from "../PacksTable/PacksTable";
import { PacksPagination } from "../PacksPagination/PacksPagination";
import resetIcon from "assets/resetfilter.svg";

export function PacksList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [page, setPage] = useState<number>();
  const [pageCount, setPageCount] = useState<number>(4);

  useEffect(() => {
    dispatch(packsThunks.get(params));
  }, [dispatch, page, pageCount]);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
    setPage(page);
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = event.currentTarget.value;
    setSearchParams((prev) => {
      prev.set("pageCount", pageCount.toString());
      return prev;
    });
    setPageCount(+pageCount);
  };

  const resetFilterHandler = () => {
    setSearchParams();
    setPage(1);
  };

  return (
    <Container style={{ maxWidth: "1048px" }}>
      <div
        style={{
          marginTop: "36px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontWeight: "600",
            fontSize: "22px",
            lineHeight: "27px",
            color: "#000000",
          }}
        >
          Packs list
        </div>
        <Button onClick={() => dispatch(packsThunks.create())}>
          Add new pack
        </Button>
      </div>

      <div
        style={{
          marginTop: "42px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>search</div>
        <div>filter</div>
        <div>number of cards</div>
        <img
          src={resetIcon}
          alt="Reset filter"
          onClick={resetFilterHandler}
          style={{ cursor: "pointer" }}
        />
      </div>
      <PacksPagination
        onPageChange={onPageChangeHandler}
        onPageCountChange={onPageCountChangeHandler}
        pageCount={pageCount}
      />
      <PacksTable />
      <div
        style={{
          marginTop: "36px",
          // display: 'flex',
          // justifyContent: 'space-between'
        }}
      ></div>
    </Container>
  );
}
