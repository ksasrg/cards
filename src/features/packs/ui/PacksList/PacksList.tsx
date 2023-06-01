import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import { useAppDispatch } from "app/hooks";
import { packsThunks } from "../../packs.slice";
import { PacksTable } from "../../components/PacksTable/PacksTable";
import { PacksPagination } from "../../components/PacksPagination/PacksPagination";
import { useFetchPackList } from "../../hooks/useFetchPackList";
import { SearchPacks } from "../../components/SearchPacks/SearchPacks";
import { PackFilter } from "features/packs/components/PackFilter/PackFilter";
import { ResetFilters } from "features/packs/components/ResetFilters/ResetFilters";

export function PacksList() {
  const dispatch = useAppDispatch();

  useFetchPackList();

  const onAddPackHandler = () => {
    const payload = { name: "test1234", deckCover: "", private: false };
    dispatch(packsThunks.create(payload));
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
        <SearchPacks />
        <PackFilter />
        <div>number of cards</div>
        <ResetFilters />
      </div>
      <PacksPagination />
      <PacksTable />
    </Container>
  );
}
