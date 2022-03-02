import { useQuery, useQueryClient, useMutation } from "react-query";

import { postCard } from "../api/card-api";
import { findOneCardlist, putCardlist } from "../api/cardlist-api";

export const useCardListHook = (cardlistId) => {
  const queryClient = useQueryClient();
  const queryKey = ["cardlist", cardlistId];

  const {
    isLoading,
    error,
    data: { title, cards: listOfCard },
  } = useQuery(
    queryKey,
    () =>
      findOneCardlist(cardlistId, {
        populate: {
          cards: {
            fields: ["id"],
            sort: ["order:asc"],
          },
        },
      }),
    {
      initialData: { title: "Loading..", cards: [] },
    }
  );

  const addCardMutationHook = useMutation(
    (newCardObject) => postCard(newCardObject),
    {
      onSuccess: (newCard) => {
        queryClient.setQueryData(queryKey, (prevState) => ({
          ...prevState,
          cards: [...prevState.cards, newCard.id],
        }));
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
    queryClient.setQueryData(queryKey, (prevState) => ({
      ...prevState,
      title: newCardlistTitle,
    }));
    putCardlist(cardlistId, { title: newCardlistTitle })
      .then()
      .catch((error) => {
        queryClient.setQueryData(queryKey, (prevState) => ({
          ...prevState,
          title: prevTitle,
        }));
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
