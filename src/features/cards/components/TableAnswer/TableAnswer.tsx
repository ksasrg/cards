import { Card } from "features/cards/cards.api";

type Props = {
  card: Card;
};

export const TableAnswer = ({ card }: Props) => {
  return (
    <>{card.answerImg ? <img src={card.answerImg} alt="" /> : card.answer}</>
  );
};
