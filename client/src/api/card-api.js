import axios from "axios";
import qs from "qs";
import { mapFetchedComment } from "./comment-api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/cards/",
});

export const mapFetchedCard = ({ id, attributes }) => {
  let transformedCard = { id, ...attributes, order: +attributes.order };
  if (transformedCard.comments) {
    transformedCard = {
      ...transformedCard,
      comments: transformedCard.comments.data.map((comment) =>
        mapFetchedComment(comment)
      ),
    };
  }
  return transformedCard;
};

export const findOneCard = async (cardId) => {
  const config = {
    populate: {
      comments: {
        sort: ["createdAt:desc"],
      },
    },
  };
  const queryParams = qs.stringify(config, { encodeValuesOnly: true });
  let {
    data: { data: card },
  } = await axiosInstance.get(`/${cardId}?${queryParams}`);
  const fetchedCard = mapFetchedCard(card);
  return fetchedCard;
};

export const findCards = async (
  filters = {},
  sort = ["order:asc"],
  populate
) => {
  const queryParams = qs.stringify(
    { filters, sort, populate },
    { encodeValuesOnly: true }
  );
  let {
    data: { data: fetchedCards },
  } = await axiosInstance.get(`/?${queryParams}`);
  fetchedCards = fetchedCards.map((card) => mapFetchedCard(card));
  return fetchedCards;
};

export const postCard = async (newCardObject) => {
  let {
    data: { data: newCard },
  } = await axiosInstance.post("/", { data: newCardObject });
  newCard = mapFetchedCard(newCard);
  return newCard;
};

export const putCards = async (patchPayload) => {
  /**
    patchPayload : {
      [cardId1] : {
        title: 'newTitle',
        order: 'newOrder',
      },
      [cardId2] : {
        title: 'newTitle',
        order: 'newOrder',
      }
    }
   */

  let {
    data: { data: patchedCards },
  } = await axiosInstance.put("/", {
    data: patchPayload,
  });
  patchedCards = patchedCards.map((card) => mapFetchedCard(card));
  return patchedCards;
};
