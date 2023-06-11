import { DeleteModal } from "common/components";
import trash from "assets/trash.svg";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { useSearchParams } from "react-router-dom";
import { Card } from "features/cards/cards.api";

type Props = {
  card: Card;
};

export const IconActionDeleteCard = ({ card }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [open, setOpen] = useState(false);

  const onSubmitDelete = (cardId: string) => {
    dispatch(cardsThunks.deleteCard({ cardId, query: params }));
  };

  const onCloseDeleteModal = () => {
    setOpen(false);
  };

  const onDeleteHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <DeleteModal
        open={open}
        id={card._id}
        title="Delete Card"
        onClose={onCloseDeleteModal}
        onDelete={onSubmitDelete}
      >
        Do you really want to remove Card? All cards will be deleted.
      </DeleteModal>
      <img src={trash} alt="delete" onClick={onDeleteHandler} />
    </>
  );
};
