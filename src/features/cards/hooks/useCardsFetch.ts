import { useAppDispatch, useAppSelector } from "app/hooks";
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
  const editUpdate = useAppSelector((state) => state.packs.editUpdate);

  useEffect(() => {
    return () => {
      dispatch(cardsActions.resetList());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(cardsThunks.get(params))
      .unwrap()
      .catch((e) => {
        if (e.response?.status === 400) navigate(RouterPaths.packs);
      });
  }, [editUpdate]); // eslint-disable-line react-hooks/exhaustive-deps
};
