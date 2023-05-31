import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";

import { ChangeEvent, useEffect } from "react";
import { packsThunks } from "../packs.slice";
import { PacksTable } from "../PacksTable/PacksTable";
import { PacksPagination } from "../PacksPagination/PacksPagination";
import resetIcon from "assets/resetfilter.svg";

export function PacksList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  useEffect(() => {
    dispatch(packsThunks.get(params));
  }, [dispatch]);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
    dispatch(packsThunks.get({ ...params, page }));
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = +event.currentTarget.value;
    setSearchParams((prev) => {
      prev.set("pageCount", pageCount.toString());
      return prev;
    });
    dispatch(packsThunks.get({ ...params, pageCount }));
  };

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload))
      .unwrap()
      .then(() => {
        setSearchParams((prev) => {
          prev.delete("page");
          return prev;
        });
      });
  };

  const resetFilterHandler = () => {
    setSearchParams();
    dispatch(packsThunks.get({}));
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
        <Button onClick={onAddPackHandler}>Add new pack</Button>
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
      />
      <PacksTable />
    </Container>
  );
}
