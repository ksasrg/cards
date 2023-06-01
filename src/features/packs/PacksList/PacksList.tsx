import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";

import { ChangeEvent, useEffect, useMemo } from "react";
import { packsActions, packsThunks } from "../packs.slice";
import { PacksTable } from "../PacksTable/PacksTable";
import { PacksPagination } from "../PacksPagination/PacksPagination";
import resetIcon from "assets/resetfilter.svg";
import { Search } from "../Search/Search";

export function PacksList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const min = useAppSelector((state) => state.packs.query.min);
  const max = useAppSelector((state) => state.packs.query.max);
  const page = useAppSelector((state) => state.packs.query.page);
  const user_id = useAppSelector((state) => state.packs.query.user_id);
  const packName = useAppSelector((state) => state.packs.query.packName);
  const pageCount = useAppSelector((state) => state.packs.query.pageCount);
  const sortPacks = useAppSelector((state) => state.packs.query.sortPacks);

  useEffect(() => {
    dispatch(packsThunks.get());

    const searchParams = {} as Record<string, string>;
    min && (searchParams["min"] = min.toString());
    max && (searchParams["max"] = max.toString());
    page && (searchParams["page"] = page.toString());
    user_id && (searchParams["user_id"] = user_id.toString());
    packName && (searchParams["packName"] = packName.toString());
    pageCount && (searchParams["pageCount"] = pageCount.toString());
    sortPacks && (searchParams["sortPacks"] = sortPacks.toString());
    setSearchParams(searchParams);
  }, [dispatch, min, max, page, pageCount, packName, user_id, sortPacks]);

  const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(packsActions.setQuery({ query: { page } }));
  };

  const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageCount = +event.currentTarget.value;
    dispatch(packsActions.setQuery({ query: { pageCount } }));
  };

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload));
  };

  const onSearchHandler = (packName: string) => {
    dispatch(packsActions.setQuery({ query: { packName, page: 1 } }));
  };

  const resetFilterHandler = () => {
    dispatch(
      packsActions.setQuery({
        query: {
          // pageCount not modifying
          page: undefined,
          packName: undefined,
          sortPacks: undefined,
          user_id: undefined,
          max: undefined,
          min: undefined,
        },
      })
    );
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
        <div>
          <Search onSearch={onSearchHandler} value={params.packName || ""} />
        </div>
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
