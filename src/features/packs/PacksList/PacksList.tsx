import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

import { ChangeEvent, useEffect } from "react";
import { packsThunks } from "../packs.slice";
import { PacksTable } from "../PacksTable/PacksTable";
import Pagination from "@mui/material/Pagination/Pagination";
import { RouterPaths } from "common/router/router";

export function PacksList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const location = useLocation();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  const pageCount = useAppSelector((state) => state.packs.packs.pageCount);
  const page = useAppSelector((state) => state.packs.packs.page);
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.packs.cardPacksTotalCount
  );

  const totalPages = Math.ceil(cardPacksTotalCount / pageCount);

  useEffect(() => {
    if (isAuthorized) dispatch(packsThunks.get(params));
  }, [dispatch]);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
    dispatch(packsThunks.get({ ...params, page }));
  };

  if (!isAuthorized) {
    return <Navigate to={RouterPaths.signin} state={{ from: location }} />;
  }

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
        <div>reset</div>
      </div>
      <PacksTable />
      <div
        style={{
          marginTop: "36px",
          // display: 'flex',
          // justifyContent: 'space-between'
        }}
      >
        <Pagination
          count={totalPages || 0}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={onPageChangeHandler}
        />
      </div>
    </Container>
  );
}
