import { useQuery, useQueryClient } from "react-query";
import { findOneCard } from "../api/card-api";

export const useCardHook = (cardId) => {
  const queryClient = useQueryClient();
  const queryKey = ["card", cardId];

  const {
    isLoading,
    error,
    data: { title },
  } = useQuery(["card", cardId], () => findOneCard(cardId), {
    initialData: { title: "....." },
  });

  const setCardTitle = (cardId, newTitle) => {
    queryClient.setQueryData(queryKey, (prevState) => ({
      ...prevState,
      title: newTitle,
    }));
  };

  // const setCardDescription = (cardId, newDescription) => {
  //   // setListOfcard((prevList) =>
  //   //   prevList.map((card) =>
  //   //     card.id === cardId ? { ...card, description: newDescription } : card
  //   //   )
  //   // );
  // };

  // const addCommentToCard = (cardId, comment, creatorName, createdAt) => {
  //   // const commentObject = { id: uuidv4(), creatorName, createdAt, comment };
  //   // setListOfcard((prevList) =>
  //   //   prevList.map((card) =>
  //   //     card.id === cardId
  //   //       ? { ...card, listOfComment: [commentObject, ...card.listOfComment] }
  //   //       : card
  //   //   )
  //   // );
  // };

  // const editComment = (cardId, commentId, newComment, updatedAt) => {
  //   // setListOfcard((prevList) => {
  //   //   return prevList.map((card) => {
  //   //     if (cardId === card.id) {
  //   //       return {
  //   //         ...card,
  //   //         listOfComment: card.listOfComment.map((commentObj) =>
  //   //           commentObj.id === commentId
  //   //             ? { ...commentObj, comment: newComment, updatedAt: updatedAt }
  //   //             : commentObj
  //   //         ),
  //   //       };
  //   //     } else return card;
  //   //   });
  //   // });
  // };

  return { title, isLoading, error };
};
