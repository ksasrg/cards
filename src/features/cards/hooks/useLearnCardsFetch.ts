import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { cardsActions, cardsThunks } from "../cards.slice";
import { useNavigate, useParams } from "react-router-dom";
import { RouterPaths } from "common/router/router";

export const useLearnCardsFetch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cardsPack_id } = useParams();

  useEffect(() => {
    dispatch(cardsThunks.fetch({ cardsPack_id }))
      .unwrap()
      .then((res) => {
        if (res.cardsTotalCount) {
          dispatch(
            cardsThunks.get({
              cardsPack_id,
              pageCount: res.cardsTotalCount,
              sortCards: "0grade",
            })
          );
        } else {
          navigate(RouterPaths.packs);
        }
      })
      .catch((e) => {
        if (e.response?.status === 400) navigate(RouterPaths.packs);
      });
    return () => {
      dispatch(cardsActions.resetList());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
