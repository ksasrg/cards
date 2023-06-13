import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsActions, cardsThunks } from "features/cards/cards.slice";
import { Choices } from "features/cards/components/Choices/Choices";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./style.module.css";

type Props = {
  index: number;
  setIndex: (index: number) => void;
};

export const QuestionsAnswers = ({ index, setIndex }: Props) => {
  const dispatch = useAppDispatch();
  const { cardsPack_id } = useParams();
  const [show, setShow] = useState(false);
  const [grade, setGrade] = useState(0);
  const cards = useAppSelector((state) => state.cards.list.cards);
  const cardsCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  const onNextHandler = async () => {
    const card_id = cards[index]._id;
    await dispatch(cardsThunks.putGrade({ card_id, grade }));
    setShow(false);
    setGrade(0);
    if (index === cards.length - 1) {
      setIndex(0);
      dispatch(cardsActions.resetList());
      await dispatch(cardsThunks.get({ cardsPack_id, pageCount: cardsCount }));
    } else {
      setIndex(index + 1);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(+e.currentTarget.value);
  };

  return (
    <>
      {show ? (
        <>
          <div className={s.qna}>
            <b>Answer: </b>
            {cards[index].answerImg ? (
              <img src={cards[index].answerImg} alt="" />
            ) : (
              cards[index].answer
            )}
          </div>
          <form className={s.radio}>
            <div>Rate yourself:</div>
            <Choices grade={grade} onChange={onChangeHandler} />
          </form>
          <div className={s.button}>
            <Button size="large" onClick={onNextHandler} disabled={!grade}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className={s.button}>
          <Button size="large" onClick={() => setShow(true)}>
            Show answer
          </Button>
        </div>
      )}
    </>
  );
};
