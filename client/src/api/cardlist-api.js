import axios from "axios";
import qs from "qs";

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
    cardList = { ...cardList, cards: attributes.cards.data };
  }
  return cardList;
};

export const findOneCardlist = async (cardlistId, config = {}) => {
  const queryParams = qs.stringify(config, { encodeValuesOnly: true });
  try {
    let {
      data: { data: fetchedCardlist },
    } = await axiosInstance.get(`/${cardlistId}?${queryParams}`);
    fetchedCardlist = mapFetchedCardlist(fetchedCardlist);

    return fetchedCardlist;
  } catch (err) {
    throw err;
  }
};

export const findCardlists = async (
  filters = {},
  sort = ["order:asc"],
  populate = {}
) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

export const postCardlist = async (newCardlistObject) => {
  try {
    let {
      data: { data: newCardlist },
    } = await axiosInstance.post("/", { data: newCardlistObject });
    newCardlist = mapFetchedCardlist(newCardlist);
    return newCardlist;
  } catch (err) {
    throw err;
  }
};

export const putCardlist = async (cardlistId, patchObject) => {
  try {
    let {
      data: { data: patchedCardlist },
    } = await axiosInstance.put(`/${cardlistId}`, {
      data: patchObject,
    });
    patchedCardlist = mapFetchedCardlist(patchedCardlist);
    return patchedCardlist;
  } catch (err) {
    throw err;
  }
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
  try {
    let {
      data: { data: patchedCardlists },
    } = await axiosInstance.put("/", {
      data: patchPayload,
    });
    patchedCardlists = patchedCardlists.map((cardlist) =>
      mapFetchedCardlist(cardlist)
    );
    return patchedCardlists;
  } catch (err) {
    throw err;
  }
};
