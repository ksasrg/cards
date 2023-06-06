import { instance } from "common/api/common.api";

export const cardsApi = {
  getCards: (payload: ArgGetCards) => {
    return instance.get<GetResponse>(`cards/card`, { params: { ...payload } });
  },
  createCard: (payload: ArgPostCard) => {
    return instance.post<PostResponse>(`cards/card`, { card: payload });
  },
};

export type ArgGetCards = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: string | number;
  pageCount?: number;
};

export type ArgPostCard = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export interface GetResponse {
  cards: Card[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packDeckCover: string;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
}

export interface PostResponse {
  newCard: Card;
  token: string;
  tokenDeathTime: number;
}

export interface Card {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
}
