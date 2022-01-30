import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
});

const mapFetchedCard = ({ id, attributes }) => {
  return { id, ...attributes, order: +attributes.order };
};

export const findOne = async (cardId) => {
  try {
    const {
      data: { data: card },
    } = await axiosInstance.get(`/cards/${cardId}`);
    const fetchedCard = mapFetchedCard(card);
    return fetchedCard;
  } catch (err) {
    throw err;
  }
};

export const find = async (filters = {}) => {
  try {
    const queryParams = qs.stringify({ filters }, { encodeValuesOnly: true });
    let {
      data: { data: fetchedCards },
    } = await axiosInstance.get(`/cards?${queryParams}`);
    fetchedCards = fetchedCards.map((card) => mapFetchedCard(card));
    return fetchedCards;
  } catch (err) {
    throw err;
  }
};

export const post = async (newCardObject) => {
  try {
    let {
      data: { data: newCard },
    } = await axiosInstance.post("/cards", { data: newCardObject });
    newCard = mapFetchedCard(newCard);
    return newCard;
  } catch (err) {
    throw err;
  }
};
