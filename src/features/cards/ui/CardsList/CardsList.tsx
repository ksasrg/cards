import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { AppPagination, BackLink, PaginationQuery } from "common/components";
import { useCardsFetch } from "features/cards/hooks/useCardsFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";
import { ArgPostCard } from "features/cards/cards.api";
import { SearchCards } from "features/cards/components/SearchCards/SearchCards";
import extraIcon from "assets/extra.svg";
import s from "./style.module.css";
import { RouterPaths } from "common/router/router";

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { cardsPack_id } = params;
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const packUserId = useAppSelector((state) => state.cards.list.packUserId);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const totalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );
  const packName = useAppSelector((state) => state.cards.list.packName);

  const isMy = userId === packUserId;

  useCardsFetch();

  const onChange = (query: PaginationQuery) => {
    setSearchParams({ ...params, ...(query as Record<string, string>) });
    dispatch(
      cardsThunks.get({ ...params, ...(query as Record<string, string>) })
    );
  };

  const onAddPackHandler = () => {
    const payload: ArgPostCard = {
      cardsPack_id,
      question:
        "question question questionquestionquestionquesti onquestionquestionq uestionquestionquest ionquestion questionquestionquestionquest ionquestionque stionquestionquestion questionquestion",
      answer:
        "answer answeransw eransweranswe ransweran sweransweransweran sweranswera nsweranswerans weranswerans weranswerans weransweransweransweransw eransweransweranswe ransweranswera nsweransweranswer",
    };

    delete params["page"];
    setSearchParams(params);
    dispatch(cardsThunks.create({ payload, query: params }));
  };

  return (
    <div className="container page">
      <BackLink />
      <div className={s.up}>
        {isMy ? (
          <>
            <div className={s.titlebox}>
              <div className={s.title}>{packName}</div>
              <div>
                <img src={extraIcon} alt="" />
              </div>
            </div>
            <Button
              onClick={() => navigate(`${RouterPaths.learn}/${cardsPack_id}`)}
            >
              Learn
            </Button>
            <Button onClick={onAddPackHandler}>Add new card</Button>
          </>
        ) : (
          <>
            <div className={s.title}>{packName}</div>
            <Button
              onClick={() => navigate(`${RouterPaths.learn}/${cardsPack_id}`)}
            >
              Learn
            </Button>
          </>
        )}
      </div>

      <AppPagination onChange={onChange} {...{ page, pageCount, totalCount }} />
      <div className={s.filters}>
        <SearchCards />
      </div>

      <CardsTable />
    </div>
  );
};
