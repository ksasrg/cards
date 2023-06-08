import { useAppDispatch, useAppSelector } from "app/hooks";
import { Th } from "common/components";
import { useSearchParams } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import s from "./style.module.css";

export function CardsTable() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const sort = params.sortCards;
  const cards = useAppSelector((state) => state.cards.list.cards);

  const onSort = (sortCards: string) => {
    setSearchParams({ ...params, sortCards });
    dispatch(cardsThunks.get({ ...params, sortCards }));
  };

  const mappedRows = cards.map((card) => {
    const updated = new Date(card.updated);
    const date = updated.toLocaleString("ru-RU");
    const width = (card.grade / 5) * 100 + "%";

    return (
      <tr key={card._id}>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{date}</td>
        <td>
          <span className={s.rating}>
            ★★★★★
            <span style={{ width }}>★★★★★</span>
          </span>
          <img src={editIconMini} alt="edit" />
          <img
            src={trash}
            alt="delete"
            onClick={() =>
              dispatch(
                cardsThunks.deleteCard({ packId: card._id, query: params })
              )
            }
          />
        </td>
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
