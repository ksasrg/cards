import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./style.module.css";

import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { packsThunks } from "../../packs.slice";

export function PacksTable() {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.list.cardPacks);
  const userId = useAppSelector((state) => state.auth.profile?._id);

  const deleteHandler = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId }));
  };

  const mappedRows = packs.map((p) => {
    const updated = new Date(p.updated);
    const date = updated.toLocaleString("ru-RU");

    return (
      <div key={p._id} className={s.row}>
        <div className={s.nameCol}>{p.name}</div>
        <div className={s.cardsCol}>{p.cardsCount}</div>
        <div className={s.updatedCol}>{date}</div>
        <div className={s.createdCol}>{p.user_name}</div>
        <div className={s.actionsCol}>
          <img src={teacher} alt="" />
          {userId === p.user_id && (
            <>
              <img src={editIconMini} alt="" />
              <img src={trash} alt="" onClick={() => deleteHandler(p._id)} />
            </>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={s.packsTable}>
      <div className={s.hrow}>
        <div className={s.nameCol}>Name</div>
        <div className={s.cardsCol}>Cards</div>
        <div className={s.updatedCol}>Last Updated</div>
        <div className={s.createdCol}>Created by</div>
        <div className={s.actionsCol}>Actions</div>
      </div>
      {mappedRows}
    </div>
  );
}
