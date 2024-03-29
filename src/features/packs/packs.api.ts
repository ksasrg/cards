import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (payload: ArgGetPacks) => {
    return instance.get(`cards/pack`, { params: { ...payload } });
  },
  create: (payload: ArgCreateCardPack) => {
    return instance.post("cards/pack", {
      cardsPack: payload,
    });
  },
  delete: (packId: string) => {
    return instance.delete(`cards/pack?id=${packId}`);
  },
  changePack: (payload: ArgChangeCardPack) => {
    return instance.put(`cards/pack`, { cardsPack: { ...payload } });
  },
};

export type ArgGetPacks = {
  page?: string | number;
  pageCount?: string;
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  user_id?: string;
};

export interface ArgCreateCardPack {
  name: string;
  deckCover: string;
  private: boolean;
}

export interface ArgChangeCardPack {
  _id: string;
  name: string;
  deckCover: string;
  private: boolean;
}
