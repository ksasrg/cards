import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch } from "app/hooks";
import { packsActions, packsThunks } from "../packs.slice";
import { PacksTable } from "../PacksTable/PacksTable";
import { PacksPagination } from "../PacksPagination/PacksPagination";
import resetIcon from "assets/resetfilter.svg";
import { useFetchPackList } from "../hooks/useFetchPackList";
import { SearchPacks } from "../SearchPacks/SearchPacks";

export function PacksList() {
  const dispatch = useAppDispatch();

  useFetchPackList();

  // const onPageChangeHandler = (event: ChangeEvent<unknown>, page: number) => {
  //   dispatch(packsActions.setQuery({ query: { page } }));
  // };

  // const onPageCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const pageCount = +event.currentTarget.value;
  //   dispatch(packsActions.setQuery({ query: { pageCount } }));
  // };

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload));
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
          <SearchPacks />
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
      <PacksPagination />
      <PacksTable />
    </Container>
  );
}
