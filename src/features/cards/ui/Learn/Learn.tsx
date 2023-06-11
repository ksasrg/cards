import { useAppSelector } from "app/hooks";
import { Preloader } from "common/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLearnCardsFetch } from "features/cards/hooks/useLearnCardsFetch";
import { QuestionsAnswers } from "../../components/QuestionsAnswers/QuestionsAnswers";
import s from "./style.module.css";

export const Learn = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const cards = useAppSelector((state) => state.cards.list.cards);
  const packName = useAppSelector((state) => state.cards.list.packName);
  const cardsCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useLearnCardsFetch();

  if (cards.length === 0) {
    return <Preloader />;
  }

  return (
    <div className="container page">
      <span onClick={() => navigate(-1)} className={s.link}>
        🡰 Back
      </span>
      <div className={s.title}>
        Learn "<span>{packName}</span>"
      </div>
      <div className={`card ${s.card}`}>
        <div className={s.progress}>
          {index + 1} of {cardsCount}
        </div>
        <div className={s.qna}>
          <b>Question: </b>
          {cards[index].questionImg ? (
            <img src={cards[index].questionImg} alt="" />
          ) : (
            cards[index].question
          )}
        </div>
        <div className={s.repititions}>
          Number of repetitions: {cards[index].shots}
        </div>
        <QuestionsAnswers index={index} setIndex={setIndex} />
      </div>
    </div>
  );
};
