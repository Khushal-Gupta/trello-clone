import axios from "axios";
import qs from "qs";
import { mapFetchedCard } from "./card-api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/cardlists/",
});

const mapFetchedCardlist = ({ id, attributes }) => {
  /* Return value
  {
    id: 1,
    title: '...',
    order: 3,
    ...otherAttributes
  }
  */
  let cardList = { id, ...attributes, order: +attributes.order };
  if (attributes.cards) {
    const fetchedCardsArray = attributes.cards.data.map((card) => ({
      ...mapFetchedCard(card),
      cardlist: id,
    }));
    cardList = { ...cardList, cards: fetchedCardsArray };
  }
  return cardList;
};

export const findOneCardlist = async (cardlistId) => {
  const config = {
    populate: {
      cards: {
        fields: ["id", "order", "title"],
        sort: ["order:asc"],
      },
    },
  };
  const queryParams = qs.stringify(config, { encodeValuesOnly: true });
  let {
    data: { data: fetchedCardlist },
  } = await axiosInstance.get(`/${cardlistId}?${queryParams}`);
  fetchedCardlist = mapFetchedCardlist(fetchedCardlist);

  return fetchedCardlist;
};

export const findCardlists = async (
  filters = {},
  sort = ["order:asc"],
  populate = {}
) => {
  const queryParams = qs.stringify(
    { filters, sort, populate },
    { encodeValuesOnly: true }
  );
  let {
    data: { data: fetchedCardlists },
  } = await axiosInstance.get(`/?${queryParams}`);
  fetchedCardlists = fetchedCardlists.map((cardlist) =>
    mapFetchedCardlist(cardlist)
  );
  return fetchedCardlists;
};

export const postCardlist = async (newCardlistObject) => {
  let {
    data: { data: newCardlist },
  } = await axiosInstance.post("/", { data: newCardlistObject });
  newCardlist = mapFetchedCardlist(newCardlist);
  return newCardlist;
};

export const putCardlist = async (cardlistId, patchObject) => {
  let {
    data: { data: patchedCardlist },
  } = await axiosInstance.put(`/${cardlistId}`, {
    data: patchObject,
  });
  patchedCardlist = mapFetchedCardlist(patchedCardlist);
  return patchedCardlist;
};

export const putCardlists = async (patchPayload) => {
  /**
    patchPayload : {
      [cardlistId1] : {
        title: 'newTitle',
        order: 'newOrder',
      },
      [cardlistId2] : {
        title: 'newTitle',
        order: 'newOrder',
      }
    }
   */

  let {
    data: { data: patchedCardlists },
  } = await axiosInstance.put("/", {
    data: patchPayload,
  });
  patchedCardlists = patchedCardlists.map((cardlist) =>
    mapFetchedCardlist(cardlist)
  );
  return patchedCardlists;
};
