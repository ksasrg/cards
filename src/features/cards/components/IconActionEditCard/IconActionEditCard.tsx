import editIconMini from "assets/editIconMini.svg";
import { ArgPutCard, Card } from "features/cards/cards.api";
import { CardData, EditCardModal } from "../EditCardModal/EditCardModal";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";

type Props = {
  card: Card;
};

export const IconActionEditCard = ({ card }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const [showModal, setShowModal] = useState(false);

  const onCardModal = (open: boolean) => {
    setShowModal(open);
  };

  const onEditPackHandler = ({ answer, question }: CardData) => {
    const payload: ArgPutCard = { _id: card._id, question, answer };

    dispatch(cardsThunks.putCard({ payload, query: params }));
  };

  return (
    <>
      <img src={editIconMini} alt="edit" onClick={() => setShowModal(true)} />
      <EditCardModal
        open={showModal}
        title="Edit card"
        answer={card.answer}
        question={card.question}
        onClose={onCardModal}
        onSave={onEditPackHandler}
      />
    </>
  );
};
