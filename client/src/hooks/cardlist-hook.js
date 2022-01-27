import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useCardListHook = (givenTitle) => {
  const [listOfCard, setListOfcard] = useState([]);
  const [title, setTitle] = useState(givenTitle);

  const addCard = (newCardTitle) => {
    const newCardObject = {
      id: uuidv4(),
      title: newCardTitle,
      description: "Add a more detailed description...",
      listOfComment: [],
      order: listOfCard.length,
    };
    setListOfcard((prevList) => [...prevList, newCardObject]);
  };

  const setCardTitle = (cardId, newTitle) => {
    setListOfcard((prevList) =>
      prevList.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
  };

  const setCardDescription = (cardId, newDescription) => {
    setListOfcard((prevList) =>
      prevList.map((card) =>
        card.id === cardId ? { ...card, description: newDescription } : card
      )
    );
  };

  const addCommentToCard = (cardId, comment, creatorName, createdAt) => {
    const commentObject = { id: uuidv4(), creatorName, createdAt, comment };
    setListOfcard((prevList) =>
      prevList.map((card) =>
        card.id === cardId
          ? { ...card, listOfComment: [commentObject, ...card.listOfComment] }
          : card
      )
    );
  };

  const editComment = (cardId, commentId, newComment, updatedAt) => {
    setListOfcard((prevList) => {
      return prevList.map((card) => {
        if (cardId === card.id) {
          return {
            ...card,
            listOfComment: card.listOfComment.map((commentObj) =>
              commentObj.id === commentId
                ? { ...commentObj, comment: newComment, updatedAt: updatedAt }
                : commentObj
            ),
          };
        } else return card;
      });
    });
  };
  return {
    title,
    listOfCard,
    setTitle,
    addCard,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
  };
};
