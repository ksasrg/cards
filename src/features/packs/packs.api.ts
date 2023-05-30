import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (payload: ArgGetPacks) => {
    const queries = [];
    let query = "";

    for (const key in payload) {
      queries.push(`${key}=${payload[key as keyof ArgGetPacks]}`);
    }

    if (queries.length) {
      query = "?" + queries.join("&");
    }

    console.log(query); // TODO  console.log
    return instance.get(`cards/pack${query}`);
  },
  create: () => {
    return instance.post("cards/pack", {
      cardsPack: { name: "test1234", deckCover: "", private: false },
    });
  },
  delete: (packId: string) => {
    return instance.delete(`cards/pack?id=${packId}`);
  },
};

export type ArgGetPacks = {
  page?: number;
  pageCount?: string;
};
