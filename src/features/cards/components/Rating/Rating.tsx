import { Card } from "features/cards/cards.api";
import s from "./style.module.css";

type Props = {
  card: Card;
};

export const Rating = ({ card }: Props) => {
  const width = (card.grade / 5) * 100 + "%";

  return (
    <span className={s.rating}>
      ★★★★★
      <span style={{ width }}>★★★★★</span>
    </span>
  );
};
