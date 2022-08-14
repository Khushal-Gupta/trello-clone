import { useQuery, useQueryClient, useMutation } from "react-query";
import { findOneCard, putCards } from "../api/card-api";

export const useCardHook = (cardId) => {
  const queryClient = useQueryClient();
  const queryKey = ["card", cardId];

  const {
    isLoading,
    error,
    data: { title: cardTitle, description: cardDescription },
  } = useQuery(["card", cardId], () => findOneCard(cardId), {
    initialData: { title: ".....", description: "..." },
  });

  const { mutate: updateCard } = useMutation(
    (updatedKeys) => putCards({ [cardId]: updatedKeys }),
    {
      onMutate: async (updatedKeys) => {
        await queryClient.cancelQueries(queryKey);
        const previousState = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (prevState) => ({
          prevState,
          ...updatedKeys,
        }));
        return { previousState };
      },
      onError: (error, variables, { previousState }) => {
        queryClient.setQueryData(queryKey, () => previousState);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const setCardTitle = (cardId, newTitle) => {
    updateCard({ title: newTitle });
  };

  const setCardDescription = (cardId, newDescription) => {
    updateCard({ description: newDescription });
  };

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

  return {
    cardTitle,
    cardDescription,
    isLoading,
    error,
    setCardTitle,
    setCardDescription,
  };
};
