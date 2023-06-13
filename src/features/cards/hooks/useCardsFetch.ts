import { useAppDispatch } from "app/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsActions, cardsThunks } from "../cards.slice";
import { RouterPaths } from "common/router/router";

export const useCardsFetch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params: ArgGetCards = Object.fromEntries(searchParams);

  useEffect(
    () => {
      dispatch(cardsThunks.get(params))
        .unwrap()
        .catch((e) => {
          if (e.response?.status === 400) navigate(RouterPaths.packs);
        });

      return () => {
        dispatch(cardsActions.resetList());
      };
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [dispatch]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};
