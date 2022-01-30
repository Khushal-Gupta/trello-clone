import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { findCards, postCard } from "../api/card-api";
import { putCardlist } from "../api/cardlist-api";

export const useCardListHook = (cardlistId, givenTitle) => {
  const [title, setTitle] = useState(givenTitle);
  const queryClient = useQueryClient();
  const queryKey = ["cardlist", cardlistId];

  const {
    isLoading,
    error,
    data: listOfCard,
  } = useQuery(queryKey, () => findCards({ cardlist: { id: cardlistId } }));

  const addCardMutationHook = useMutation(
    (newCardObject) => postCard(newCardObject),
    {
      onSuccess: (newCard) => {
        queryClient.setQueryData(queryKey, (prevlist) => [
          ...prevlist,
          newCard,
        ]);
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const addCard = (newCardTitle) => {
    const newCardObject = {
      title: newCardTitle,
      description: "Add a more detailed description...",
      order: listOfCard.length,
      cardlist: cardlistId,
    };
    addCardMutationHook.mutate(newCardObject);
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
    putCardlist(cardlistId, { title: newCardlistTitle })
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
    isLoading,
    error,
  };
};
