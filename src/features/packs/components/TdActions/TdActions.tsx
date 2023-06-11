import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { AppLink, DeleteModal } from "common/components";
import { RouterPaths } from "common/router/router";
import { CardPack, packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  pack: CardPack;
};

export const TdActions = ({ pack }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const isMy = userId === pack.user_id;
  const isActive = Boolean(pack.cardsCount) || isMy;

  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setOpen(true);
  };

  const onSubmitDelete = (packId: string) => {
    dispatch(packsThunks.deletePack({ packId, query: params }));
  };

  const onCloseDeleteModal = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteModal
        open={open}
        id={pack._id}
        name={pack.name}
        title="Delete Pack"
        onClose={onCloseDeleteModal}
        onDelete={onSubmitDelete}
      >
        {`Do you really want to remove $name$? All cards will be deleted.`}
      </DeleteModal>
      <td>
        {isActive ? (
          <AppLink to={`${RouterPaths.learn}/${pack._id}`}>
            <img src={teacher} alt="learn" />
          </AppLink>
        ) : (
          <img src={teacher} alt="learn" style={{ opacity: "0.5" }} />
        )}

        {isMy && (
          <>
            <img src={editIconMini} alt="edit" />
            <img src={trash} alt="delete" onClick={onDelete} />
          </>
        )}
      </td>
    </>
  );
};
