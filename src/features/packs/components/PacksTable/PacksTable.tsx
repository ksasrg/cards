import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./style.module.css";
import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { packsActions, packsThunks } from "../../packs.slice";
import { Th } from "../Th/Th";

export function PacksTable() {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.list.cardPacks);
  const sort = useAppSelector((state) => state.packs.query.sortPacks);
  const userId = useAppSelector((state) => state.auth.profile?._id);

  const deleteHandler = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId }));
  };

  const onSortHandler = (sortPacks: string) => {
    dispatch(packsActions.setQuery({ query: { sortPacks } }));
  };

  const mappedRows = packs.map((p) => {
    const updated = new Date(p.updated);
    const date = updated.toLocaleString("ru-RU");

    return (
      <tr key={p._id}>
        <td>{p.name}</td>
        <td>{p.cardsCount}</td>
        <td>{date}</td>
        <td>{p.user_name}</td>
        <td>
          <img src={teacher} alt="" />
          {userId === p.user_id && (
            <>
              <img src={editIconMini} alt="" />
              <img src={trash} alt="" onClick={() => deleteHandler(p._id)} />
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <Th
            name="Name"
            width="360px"
            sort={sort}
            query="name"
            onSort={onSortHandler}
          />
          <Th
            name="Cards"
            sort={sort}
            query="cardsCount"
            width="110px"
            onSort={onSortHandler}
          />
          <Th
            name="Last Updated"
            sort={sort}
            query="updated"
            width="160px"
            onSort={onSortHandler}
          />
          <Th
            name="Created by"
            sort={sort}
            query="user_name"
            width="260px"
            onSort={onSortHandler}
          />
          <th style={{ width: "108px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>{mappedRows}</tbody>
    </table>
  );
}
