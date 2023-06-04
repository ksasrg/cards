import { useAppDispatch, useAppSelector } from "app/hooks";
import { Th } from "common/components";
import s from "./style.module.css";
import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { Link, useSearchParams } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { packsThunks } from "features/packs/packs.slice";

export function PacksTable() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const sort = params.sortPacks;
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packs = useAppSelector((state) => state.packs.list.cardPacks);

  const deleteHandler = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId, query: params }));
  };

  const onSort = (sortPacks: string) => {
    setSearchParams({ ...params, sortPacks });
  };

  const mappedRows = packs.map((p) => {
    const updated = new Date(p.updated);
    const date = updated.toLocaleString("ru-RU");

    let packName;
    let teachIcon = <img src={teacher} alt="learn" />;
    if (p.cardsCount) {
      packName = (
        <Link to={`${RouterPaths.cards}/?cardsPack_id=${p._id}`}>{p.name}</Link>
      );
      teachIcon = (
        <Link to={`${RouterPaths.cards}/?cardsPack_id=${p._id}`}>
          {teachIcon}
        </Link>
      );
    } else {
      packName = p.name;
      teachIcon = <img src={teacher} alt="learn" style={{ opacity: "0.5" }} />;
    }

    let editIcon, trashIcon;
    if (userId === p.user_id) {
      editIcon = <img src={editIconMini} alt="edit" />;
      trashIcon = (
        <img src={trash} alt="delete" onClick={() => deleteHandler(p._id)} />
      );
    }

    return (
      <tr key={p._id}>
        <td>{packName}</td>
        <td>{p.cardsCount}</td>
        <td>{date}</td>
        <td>{p.user_name}</td>
        <td>
          {teachIcon}
          {editIcon}
          {trashIcon}
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
