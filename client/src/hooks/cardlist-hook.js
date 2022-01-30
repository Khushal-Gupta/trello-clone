import { useEffect, useState } from "react";
import { findCards, postCard } from "../api/card-api";
import { putCardlist } from "../api/cardlist-api";

export const useCardListHook = (cardlistId, givenTitle) => {
  const [listOfCard, setListOfcard] = useState([]);
  const [title, setTitle] = useState(givenTitle);

  useEffect(() => {
    findCards({ cardlist: { id: cardlistId } })
      .then((fetchedCards) => {
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

    postCard(newCardObject)
      .then((newCard) => {
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
    putCardlist({ title: newCardlistTitle })
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
