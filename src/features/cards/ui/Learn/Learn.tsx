import { useAppDispatch, useAppSelector } from "app/hooks";
import { BackLink, Preloader } from "common/components";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { RouterPaths } from "common/router/router";
import { ChangeEvent, useEffect, useState } from "react";
import { cardsActions, cardsThunks } from "features/cards/cards.slice";
import s from "./style.module.css";

export const Learn = () => {
  const dispatch = useAppDispatch();
  const { cardsPack_id } = useParams();
  const [index, setIndex] = useState(0);
  const [grade, setGrade] = useState(0);
  const [show, setShow] = useState(false);

  const cards = useAppSelector((state) => state.cards.list.cards);
  const packName = useAppSelector(
    (state) =>
      state.packs.list.cardPacks.find((p) => p._id === cardsPack_id)?.name
  );
  const cardsCount = useAppSelector(
    (state) =>
      state.packs.list.cardPacks.find((p) => p._id === cardsPack_id)?.cardsCount
  );

  useEffect(() => {
    dispatch(cardsThunks.get({ cardsPack_id, pageCount: cardsCount }));

    return () => {
      dispatch(cardsActions.resetList());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onNextHandler = () => {
    const card_id = cards[index]._id;
    dispatch(cardsThunks.putGrade({ card_id, grade }));
    setIndex((index) => ++index);
    setGrade(0);
    setShow(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(+e.currentTarget.value);
  };

  if (!packName) {
    return <Navigate to={RouterPaths.packs} />;
  }

  if (cards.length === 0) {
    return <Preloader />;
  }

  if (index >= cards.length) {
    return <div>end</div>;
  }

  return (
    <div className="container page">
      <BackLink />
      <div className={s.title}>
        Learn "<span>{packName}</span>"
      </div>
      <div className={`card ${s.card}`}>
        <div className={s.qna}>
          <b>Question: </b>
          {cards[index].question}
        </div>
        <div className={s.repititions}>
          Number of repetitions: {cards[index].shots}
        </div>

        {show ? (
          <>
            <div className={s.qna}>
              <b>Answer: </b>
              {cards[index].answer}
            </div>
            <form className={s.radio}>
              <div>Rate yourself:</div>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value={1}
                  checked={1 === grade}
                  onChange={onChangeHandler}
                />
                <span>Did not know</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value={2}
                  checked={2 === grade}
                  onChange={onChangeHandler}
                />
                <span>Forgot</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value={3}
                  checked={3 === grade}
                  onChange={onChangeHandler}
                />
                <span>A lot of thought</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value={4}
                  checked={4 === grade}
                  onChange={onChangeHandler}
                />
                <span>Confused</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value={5}
                  checked={5 === grade}
                  onChange={onChangeHandler}
                />
                <span>Knew the answer</span>
              </label>
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
      </div>
    </div>
  );
};
