import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { TdActions } from "../TdActions/TdActions";
import { TdPackName } from "../TdPackName/TdPackName";
import { Th } from "common/components";
import s from "./style.module.css";

export function PacksTable() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const sort = params.sortPacks;
  const packs = useAppSelector((state) => state.packs.list.cardPacks);

  const onSort = (sortPacks: string) => {
    setSearchParams({ ...params, sortPacks });
    dispatch(packsThunks.get({ ...params, sortPacks }));
  };

  const mappedRows = packs.map((pack) => {
    const date = new Date(pack.updated).toLocaleString("ru-RU");

    return (
      <tr key={pack._id}>
        <TdPackName pack={pack} />
        <td>{pack.cardsCount}</td>
        <td>{date}</td>
        <td>{pack.user_name}</td>
        <TdActions pack={pack} />
      </tr>
    );
  });

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <Th {...{ sort, onSort, name: "Name", query: "name" }} />
          <Th {...{ sort, onSort, name: "Cards", query: "cardsCount" }} />
          <Th {...{ sort, onSort, name: "Last Updated", query: "updated" }} />
          <Th {...{ sort, onSort, name: "Created by", query: "user_name" }} />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{mappedRows}</tbody>
    </table>
  );
}
