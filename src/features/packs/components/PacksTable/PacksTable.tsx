import { useAppSelector } from "app/hooks";
import { Th } from "common/components";
import s from "./style.module.css";
import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { Link, useSearchParams } from "react-router-dom";

export function PacksTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const packs = useAppSelector((state) => state.packs.list.cardPacks);
  const sort = params.sortPacks;
  const userId = useAppSelector((state) => state.auth.profile?._id);

  const deleteHandler = (packId: string) => {
    setSearchParams({ ...params, packId });
  };

  const onSort = (sortPacks: string) => {
    setSearchParams({ ...params, sortPacks });
  };

  const mappedRows = packs.map((p) => {
    const updated = new Date(p.updated);
    const date = updated.toLocaleString("ru-RU");

    return (
      <tr key={p._id}>
        <td>
          <Link to={`cards/?cardsPack_id=${p._id}`}>{p.name}</Link>
        </td>
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
          <Th name="Name" sort={sort} query="name" onSort={onSort} />
          <Th name="Cards" sort={sort} query="cardsCount" onSort={onSort} />
          <Th name="Last Updated" sort={sort} query="updated" onSort={onSort} />
          <Th name="Created by" sort={sort} query="user_name" onSort={onSort} />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{mappedRows}</tbody>
    </table>
  );
}
