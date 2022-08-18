import { useQuery, useQueryClient, useMutation } from "react-query";
import { findOneCard, putCards } from "../api/card-api";
import {
  deleteComment as removeComment,
  postComment,
  putComment,
} from "../api/comment-api";

export const useCardHook = (cardId) => {
  const queryClient = useQueryClient();
  const queryKey = ["card", cardId];

  const {
    isLoading,
    error,
    data: {
      title: cardTitle,
      description: cardDescription,
      comments: listOfComments,
    },
  } = useQuery(["card", cardId], () => findOneCard(cardId), {
    initialData: { title: ".....", description: "...", comments: [] },
  });

  const { mutate: updateCard } = useMutation(
    (updatedKeys) => putCards({ [cardId]: updatedKeys }),
    {
      onMutate: async (updatedKeys) => {
        await queryClient.cancelQueries(queryKey);
        const previousState = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (prevState) => ({
          ...prevState,
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

  const { mutate: addCommentMutation } = useMutation(postComment, {
    onSuccess: (newComment) => {
      queryClient.setQueryData(queryKey, (prevState) => ({
        ...prevState,
        listOfComments: [newComment, ...prevState.listOfComments],
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const addCommentToCard = (comment, creatorName) => {
    const newCommentObject = {
      comment: comment,
      creatorName: creatorName,
      card: cardId,
    };
    addCommentMutation(newCommentObject);
  };
  const { mutate: editCommentMutation } = useMutation(
    ({ commentId, patchObject }) => putComment(commentId, patchObject),
    {
      onMutate: async ({ commentId, patchObject }) => {
        await queryClient.cancelQueries(queryKey);
        const previousState = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (prevState) => ({
          ...prevState,
          comments: prevState.comments.map((comment) =>
            comment.id === commentId ? { ...comment, ...patchObject } : comment
          ),
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

  const editComment = (commentId, newComment) => {
    console.log("editing comment");
    editCommentMutation({ commentId, patchObject: { comment: newComment } });
  };

  const { mutate: deleteCommentMutation } = useMutation(removeComment, {
    onMutate: async (commentId) => {
      await queryClient.cancelQueries(queryKey);
      const previousState = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prevState) => ({
        ...prevState,
        comments: prevState.comments.filter(
          (comment) => comment.id !== commentId
        ),
      }));

      return { previousState };
    },
    onError: (error, variables, { previousState }) => {
      queryClient.setQueryData(queryKey, () => previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  const deleteComment = deleteCommentMutation;

  return {
    cardTitle,
    cardDescription,
    listOfComments,
    isLoading,
    error,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
    deleteComment,
  };
};
