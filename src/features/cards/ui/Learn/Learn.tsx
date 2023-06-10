import { useAppDispatch, useAppSelector } from "app/hooks";
import { BackLink, Preloader } from "common/components";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { RouterPaths } from "common/router/router";
import s from "./style.module.css";
import { useEffect } from "react";
import { cardsActions, cardsThunks } from "features/cards/cards.slice";

export const Learn = () => {
  const dispatch = useAppDispatch();
  const { cardsPack_id } = useParams();

  const cards = useAppSelector((state) => state.cards.list.cards);
  const packName = useAppSelector(
    (state) =>
      state.packs.list.cardPacks.find((p) => p._id === cardsPack_id)?.name
  );

  useEffect(() => {
    dispatch(cardsThunks.get({ cardsPack_id }));

    return () => {
      dispatch(cardsActions.resetList());
    };
  }, []);

  if (!packName) {
    return <Navigate to={RouterPaths.packs} />;
  }

  if (cards.length === 0) {
    return <Preloader />;
  }

  console.log(cards);

  return (
    <div className="container page">
      <BackLink />
      <div className={s.title}>
        Learn "<span>{packName}</span>"
      </div>
      <div className={`card ${s.card}`}>
        <div>
          <b>Question: </b>
          {cards[0].question}
        </div>
        <div className={s.repititions}>
          Number of repetitions: {cards[0].shots}
        </div>
        <div>
          <b>Answer: </b>
          {cards[0].answer}
        </div>

        <div className={s.radio}>
          <div>Rate yourself:</div>
          <label>
            <input type="radio" name="grade" value={1} />
            <span>Did not know</span>
          </label>
          <label>
            <input type="radio" name="grade" value={2} />
            <span>Forgot</span>
          </label>
          <label>
            <input type="radio" name="grade" value={3} />
            <span>A lot of thought</span>
          </label>
          <label>
            <input type="radio" name="grade" value={4} />
            <span>Confused</span>
            Confused
          </label>
          <label>
            <input type="radio" name="grade" value={5} />
            <span>Knew the answer</span>
          </label>
        </div>
        <div className={s.button}>
          <Button size="large">Next</Button>
        </div>
      </div>
    </div>
  );
};
