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
    setListOfcard((prevList) => {
      const indexOfCard = prevList.findIndex((elem) => elem.id === cardId);
      const newListofCard = [...prevList];
      if (indexOfCard >= 0) {
        const updatedCard = { ...prevList[indexOfCard] };
        updatedCard.description = newDescription;
        newListofCard[indexOfCard] = updatedCard;
      }
      return newListofCard;
    });
  };

  const addCommentToCard = (cardId, comment, creatorName, createdAt) => {
    setListOfcard((prevList) => {
      const indexOfCard = prevList.findIndex((elem) => elem.id === cardId);
      const newListofCard = [...prevList];
      if (indexOfCard >= 0) {
        const commentObject = { id: uuidv4(), creatorName, createdAt, comment };
        const updatedCard = { ...prevList[indexOfCard] };
        updatedCard.listOfComment = [
          commentObject,
          ...updatedCard.listOfComment,
        ];
        newListofCard[indexOfCard] = updatedCard;
      }
      return newListofCard;
    });
  };

  const editComment = (cardId, commentId, newComment, updatedAt) => {
    setListOfcard((prevList) => {
      const indexOfCard = prevList.findIndex((elem) => elem.id === cardId);
      const newListofCard = [...prevList];
      if (indexOfCard >= 0) {
        const listOfComment = [...prevList[indexOfCard].listOfComment];
        const indexOfComment = listOfComment.findIndex(
          (elem) => elem.id === commentId
        );
        if (indexOfComment >= 0) {
          const commentObject = {
            ...listOfComment[indexOfComment],
            comment: newComment,
            updatedAt,
          };
          listOfComment[indexOfComment] = commentObject;
          const updatedCard = { ...prevList[indexOfCard], listOfComment };

          newListofCard[indexOfCard] = updatedCard;
        }
      }
      return newListofCard;
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
