import Button from "@mui/material/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RouterPaths } from "common/router/router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { usePopover } from "common/hooks/usePopover";
import {
  CardData,
  EditCardModal,
} from "features/cards/components/EditCardModal/EditCardModal";
import { useState } from "react";
import { ArgPostCard } from "features/cards/cards.api";
import { cardsThunks } from "features/cards/cards.slice";
import { PackActionDeletePack } from "features/packs/components/PackActionDeletePack/PackActionDeletePack";
import extraIcon from "assets/extra.svg";
import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import s from "./style.module.css";
import { PackActionEditName } from "features/packs/components/PackActionEditName/PackActionEditName";

export const CardsListHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { cardsPack_id: packId } = params;
  const packName = useAppSelector((state) => state.cards.list.packName);
  const isPrivate = useAppSelector((state) => state.cards.list.packPrivate);
  const packUserId = useAppSelector((state) => state.cards.list.packUserId);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const [showModal, setShowModal] = useState(false);
  const learn = `${RouterPaths.learn}/${packId}`;
  const isMy = userId === packUserId;
  const [clickbox, popover] = usePopover("extra", "actions", [isMy]);

  const onCardModal = (open: boolean) => {
    setShowModal(open);
  };

  const onAddPackHandler = ({ answer, question }: CardData) => {
    const payload: ArgPostCard = { cardsPack_id: packId, question, answer };

    delete params["page"];
    setSearchParams(params);
    dispatch(cardsThunks.create({ payload, query: params }));
  };

  return (
    <div className={s.up}>
      <EditCardModal
        open={showModal}
        title="Add new card"
        onClose={onCardModal}
        onSave={onAddPackHandler}
      />
      <div className={s.titlebox}>
        <div className={s.title}>{packName}</div>
        {isMy && (
          <div className={s.extra}>
            <img id={clickbox} src={extraIcon} alt="extra" />
            <div id={popover} className={s.popover}>
              <div onClick={() => navigate(learn)}>
                <img src={teacher} alt="learn" />
                Learn
              </div>
              <div>
                <PackActionEditName {...{ packId, packName, isPrivate }}>
                  <img src={editIconMini} alt="edit" /> Edit
                </PackActionEditName>
              </div>
              <div>
                <PackActionDeletePack packId={packId} packName={packName}>
                  <img src={trash} alt="delete" /> Delete
                </PackActionDeletePack>
              </div>
            </div>
          </div>
        )}
      </div>
      {isMy ? (
        <Button onClick={() => onCardModal(true)}>Add new card</Button>
      ) : (
        <Button onClick={() => navigate(learn)}>Learn</Button>
      )}
    </div>
  );
};
