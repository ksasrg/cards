import { Card } from "features/cards/cards.api";

type Props = {
  card: Card;
};

export const TableQuestion = ({ card }: Props) => {
  return (
    <>
      {card.questionImg ? <img src={card.questionImg} alt="" /> : card.question}
    </>
  );
};
