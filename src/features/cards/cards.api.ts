import { instance } from "common/api/common.api";

export const cardsApi = {
  getCards: (payload: ArgGetCards) => {
    return instance.get<GetResponse>(`cards/card`, { params: { ...payload } });
  },
  createCard: (payload: ArgPostCard) => {
    return instance.post<PostResponse>(`cards/card`, { card: payload });
  },
  deleteCard: (cardId: string) => {
    return instance.delete<DeleteResponse>(`cards/card/?id=${cardId}`);
  },
  putGrade: (card_id: string, grade: number) => {
    return instance.put<PutGradeResponse>(`/cards/grade`, { card_id, grade });
  },
  putCard: (payload: ArgPutCard) => {
    return instance.put<PutCardResponse>(`/cards/card`, { card: payload });
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

export type ArgPutCard = {
  _id: string;
  question?: string;
  answer?: string;
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

export interface DeleteResponse {
  deletedCard: Card;
  token: string;
  tokenDeathTime: number;
}

export interface PutCardResponse {
  updatedCard: Card;
  token: string;
  tokenDeathTime: number;
}

export interface PutGradeResponse {
  updatedGrade: UpdatedGrade;
  token: string;
  tokenDeathTime: number;
}

export interface UpdatedGrade {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
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
