import { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { DeleteModal } from "common/components";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import { ActionIcons } from "../ActionsIcons/ActionsIcons";
import { PackCell } from "../PackCell/PackCell";
import { Th } from "common/components";
import s from "./style.module.css";

export function PacksTable() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const sort = params.sortPacks;
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packs = useAppSelector((state) => state.packs.list.cardPacks);

  const init = { open: false, id: "", name: "" };
  const [deleteModal, setDeleteModal] = useState(init);

  const onSubmitDelete = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId, query: params }));
  };

  const onDeleteHandler = (id: string, name: string) => {
    setDeleteModal({ open: true, id, name });
  };

  const onCloseModal = () => {
    setDeleteModal({ open: false, id: "", name: "" });
  };

  const onSort = (sortPacks: string) => {
    setSearchParams({ ...params, sortPacks });
    dispatch(packsThunks.get({ ...params, sortPacks }));
  };

  const mappedRows = packs.map((p) => {
    const date = new Date(p.updated).toLocaleString("ru-RU");
    const { _id: packId, name } = p;
    const isMy = userId === p.user_id;
    const isActive = Boolean(p.cardsCount) || isMy;

    const onDelete = () => {
      onDeleteHandler(packId, name);
    };

    return (
      <tr key={packId}>
        <td>
          <PackCell {...{ packId, name, isActive }} />
        </td>
        <td>{p.cardsCount}</td>
        <td>{date}</td>
        <td>{p.user_name}</td>
        <td>
          <ActionIcons {...{ isMy, packId, isActive, onDelete }} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <DeleteModal
        modal={deleteModal}
        title="Delete Pack"
        onClose={onCloseModal}
        onDelete={onSubmitDelete}
      >
        {`Do you really want to remove $name$? All cards will be deleted.`}
      </DeleteModal>
      <table className={s.table}>
        <thead>
          <tr>
            <Th name="Name" sort={sort} query="name" onSort={onSort} />
            <Th name="Cards" sort={sort} query="cardsCount" onSort={onSort} />
            <Th
              name="Last Updated"
              sort={sort}
              query="updated"
              onSort={onSort}
            />
            <Th
              name="Created by"
              sort={sort}
              query="user_name"
              onSort={onSort}
            />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{mappedRows}</tbody>
      </table>
    </>
  );
}
