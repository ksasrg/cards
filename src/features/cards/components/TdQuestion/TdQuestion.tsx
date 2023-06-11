import { Card } from "features/cards/cards.api";

type Props = {
  card: Card;
};

export const TdQuestion = ({ card }: Props) => {
  return (
    <td>
      {card.questionImg ? <img src={card.questionImg} alt="" /> : card.question}
    </td>
  );
};
