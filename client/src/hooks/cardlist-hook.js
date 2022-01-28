import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
});

export const useCardListHook = (cardlistId, givenTitle) => {
  const [listOfCard, setListOfcard] = useState([]);
  const [title, setTitle] = useState(givenTitle);

  useEffect(() => {
    axiosInstance
      .get(`/cardlists/${cardlistId}?populate=*`)
      .then((response) => {
        const cards = response.data.data.attributes.cards.data;
        const fetchedCards = cards.map(
          ({ id, attributes: { title, description, order } }) => {
            return {
              id,
              title,
              description,
              listOfComments: [],
              order: +order,
            };
          }
        );
        setListOfcard(fetchedCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cardlistId]);

  const addCard = (newCardTitle) => {
    const newCardObject = {
      title: newCardTitle,
      description: "Add a more detailed description...",
      order: listOfCard.length,
      cardlist: cardlistId,
    };

    axiosInstance
      .post("/cards", { data: newCardObject })
      .then((response) => {
        const {
          id,
          attributes: { title, description, order },
        } = response.data.data;
        const newCard = {
          id,
          title,
          description,
          order: +order,
          listOfComments: [],
        };
        setListOfcard((prevList) => [...prevList, newCard]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setCardTitle = (cardId, newTitle) => {
    // setListOfcard((prevList) =>
    //   prevList.map((card) =>
    //     card.id === cardId ? { ...card, title: newTitle } : card
    //   )
    // );
  };

  const setCardDescription = (cardId, newDescription) => {
    // setListOfcard((prevList) =>
    //   prevList.map((card) =>
    //     card.id === cardId ? { ...card, description: newDescription } : card
    //   )
    // );
  };

  const addCommentToCard = (cardId, comment, creatorName, createdAt) => {
    // const commentObject = { id: uuidv4(), creatorName, createdAt, comment };
    // setListOfcard((prevList) =>
    //   prevList.map((card) =>
    //     card.id === cardId
    //       ? { ...card, listOfComment: [commentObject, ...card.listOfComment] }
    //       : card
    //   )
    // );
  };

  const editComment = (cardId, commentId, newComment, updatedAt) => {
    // setListOfcard((prevList) => {
    //   return prevList.map((card) => {
    //     if (cardId === card.id) {
    //       return {
    //         ...card,
    //         listOfComment: card.listOfComment.map((commentObj) =>
    //           commentObj.id === commentId
    //             ? { ...commentObj, comment: newComment, updatedAt: updatedAt }
    //             : commentObj
    //         ),
    //       };
    //     } else return card;
    //   });
    // });
  };

  const setCardlistTitle = (newCardlistTitle) => {
    const prevTitle = title;
    setTitle(newCardlistTitle);
    axiosInstance
      .put(`/cardlists/${cardlistId}`, { data: { title: newCardlistTitle } })
      .then()
      .catch((error) => {
        setTitle(prevTitle);
        console.log(error);
      });
  };

  
  return {
    title,
    listOfCard,
    setTitle: setCardlistTitle,
    addCard,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
  };
};
