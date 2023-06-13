import { useAppDispatch, useAppSelector } from "app/hooks";
import { Th } from "common/components";
import { useSearchParams } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";
import { TdCardTExt } from "../TdCardTExt/TdCardTExt";
import { IconActionDeleteCard } from "../IconActionDeleteCard/IconActionDeleteCard";
import { IconActionEditCard } from "../IconActionEditCard/IconActionEditCard";
import { Rating } from "../Rating/Rating";
import s from "./style.module.css";

export function CardsTable() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const sort = params.sortCards;
  const cards = useAppSelector((state) => state.cards.list.cards);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.list.packUserId);

  const isMy = userId === packUserId;

  const onSort = (sortCards: string) => {
    setSearchParams({ ...params, sortCards });
    dispatch(cardsThunks.get({ ...params, sortCards }));
  };

  const mappedRows = cards.map((card) => {
    const updated = new Date(card.updated);
    const date = updated.toLocaleString("ru-RU");

    return (
      <tr key={card._id}>
        <TdCardTExt text={card.question} img={card.questionImg} />
        <TdCardTExt text={card.answer} img={card.answerImg} />
        <td>{date}</td>
        <td>
          <Rating card={card} />
          {isMy && (
            <>
              <IconActionEditCard card={card} />
              <IconActionDeleteCard card={card} />
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <Th sort={sort} onSort={onSort} name="Question" query="question" />
          <Th sort={sort} onSort={onSort} name="Answer" query="answer" />
          <Th {...{ sort, onSort, name: "Last Updated", query: "updated" }} />
          <Th sort={sort} onSort={onSort} name="Grade" query="grade" />
        </tr>
      </thead>
      <tbody>{mappedRows}</tbody>
    </table>
  );
}
