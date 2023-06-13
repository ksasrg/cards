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
import extraIcon from "assets/extra.svg";
import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import s from "./style.module.css";

export const CardsListHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { cardsPack_id } = params;
  const packName = useAppSelector((state) => state.cards.list.packName);
  const packUserId = useAppSelector((state) => state.cards.list.packUserId);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const [showModal, setShowModal] = useState(false);

  const isMy = userId === packUserId;
  const [clickbox, popover] = usePopover("extra", "actions", [isMy]);

  const onCardModal = (open: boolean) => {
    setShowModal(open);
  };

  const onAddPackHandler = ({ answer, question }: CardData) => {
    const payload: ArgPostCard = { cardsPack_id, question, answer };

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
      {isMy ? (
        <>
          <div className={s.titlebox}>
            <div className={s.title}>{packName}</div>
            <div className={s.extra}>
              <img id={clickbox} src={extraIcon} alt="" />
              <div id={popover} className={s.popover}>
                <div
                  onClick={() =>
                    navigate(`${RouterPaths.learn}/${cardsPack_id}`)
                  }
                >
                  <img src={teacher} alt="Learn" />
                  Learn
                </div>
                <div>
                  <img src={editIconMini} alt="" /> Edit
                </div>
                <div>
                  <img src={trash} alt="" /> Delete
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => onCardModal(true)}>Add new card</Button>
        </>
      ) : (
        <>
          <div className={s.title}>{packName}</div>
          <Button
            onClick={() => navigate(`${RouterPaths.learn}/${cardsPack_id}`)}
          >
            Learn
          </Button>
        </>
      )}
    </div>
  );
};
