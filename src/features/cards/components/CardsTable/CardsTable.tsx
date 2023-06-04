import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsActions } from "features/cards/cards.slice";
import { Th } from "common/components";
import s from "./style.module.css";

export function CardsTable() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.list.cards);
  const sort = useAppSelector((state) => state.cards.query.sortCards);

  const onSort = (sortCards: string) => {
    dispatch(cardsActions.setQuery({ query: { sortCards } }));
  };

  const mappedRows = cards.map((card) => {
    const updated = new Date(card.updated);
    const date = updated.toLocaleString("ru-RU");

    return (
      <tr key={card._id}>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{date}</td>
        <td>{card.grade}</td>
      </tr>
    );
  });

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <Th name="Question" sort={sort} query="question" onSort={onSort} />
          <Th name="Answer" sort={sort} query="answer" onSort={onSort} />
          <Th name="Last Updated" sort={sort} query="updated" onSort={onSort} />
          <Th name="Grade" sort={sort} query="grade" onSort={onSort} />
        </tr>
      </thead>
      <tbody>{mappedRows}</tbody>
    </table>
  );
}
