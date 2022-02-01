import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/cards/",
});

export const mapFetchedCard = ({ id, attributes }) => {
  return { id, ...attributes, order: +attributes.order };
};

export const findOneCard = async (cardId) => {
  try {
    let {
      data: { data: card },
    } = await axiosInstance.get(`/${cardId}`);
    const fetchedCard = mapFetchedCard(card);
    return fetchedCard;
  } catch (err) {
    throw err;
  }
};

export const findCards = async (
  filters = {},
  sort = ["order:asc"],
  populate
) => {
  try {
    const queryParams = qs.stringify(
      { filters, sort, populate },
      { encodeValuesOnly: true }
    );
    let {
      data: { data: fetchedCards },
    } = await axiosInstance.get(`/?${queryParams}`);
    fetchedCards = fetchedCards.map((card) => mapFetchedCard(card));
    return fetchedCards;
  } catch (err) {
    throw err;
  }
};

export const postCard = async (newCardObject) => {
  try {
    let {
      data: { data: newCard },
    } = await axiosInstance.post("/", { data: newCardObject });
    newCard = mapFetchedCard(newCard);
    return newCard;
  } catch (err) {
    throw err;
  }
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
  try {
    let {
      data: { data: patchedCards },
    } = await axiosInstance.put("/", {
      data: patchPayload,
    });
    patchedCards = patchedCards.map((card) => mapFetchedCard(card));
    return patchedCards;
  } catch (err) {
    throw err;
  }
};
