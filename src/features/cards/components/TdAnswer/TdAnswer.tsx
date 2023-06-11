import { Card } from "features/cards/cards.api";

type Props = {
  card: Card;
};

export const TdAnswer = ({ card }: Props) => {
  return (
    <td>
      {card.answerImg ? <img src={card.answerImg} alt="" /> : card.answer}
    </td>
  );
};
