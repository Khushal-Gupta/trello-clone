import { useQuery, useQueryClient, useMutation } from "react-query";

import { findCardlists, postCardlist, putCardlists } from "../api/cardlist-api";
import {
  handleCardDropInDifferentCardlist,
  handleCardDropInSameCardlist,
  handleCardlistDrag,
} from "../util/handleDrag";

export const useWorkspaceHook = () => {
  const queryKey = "workspace";
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: listOfCardList,
  } = useQuery(queryKey, () => findCardlists());

  const { mutate: addCardListMutation } = useMutation(
    (newCardListObject) => postCardlist(newCardListObject),
    {
      onSuccess: (newCardList) => {
        queryClient.setQueryData(queryKey, (prevlist) => [
          ...prevlist,
          newCardList,
        ]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const onAddCardListHandler = (newCardListTitle) => {
    const newCardListOject = {
      title: newCardListTitle,
      order: listOfCardList.length,
    };
    addCardListMutation(newCardListOject);
  };

  const { mutate: updateCardListOrderMutation } = useMutation(
    (variables) => putCardlists(variables.apiPayload),
    {
      onMutate: async ({ updatedList }) => {
        await queryClient.cancelQueries(queryKey);
        const previousList = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, () => updatedList);
        return { previousList };
      },
      onError: (error, variables, { previousList }) => {
        queryClient.setQueryData(queryKey, () => previousList);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const { mutate: updateCardOrderMutation } = useMutation(
    (variables) => variables.promise,
    {
      onMutate: async ({ updatedList, cardlistQueryKey }) => {
        await queryClient.cancelQueries(cardlistQueryKey);
        const prevState = queryClient.getQueryData(cardlistQueryKey);

        queryClient.setQueryData(cardlistQueryKey, (prev) => ({
          ...prev,
          cards: updatedList,
        }));
        return { prevState };
      },
      onError: (error, { cardlistQueryKey }, { prevState }) => {
        queryClient.setQueryData(cardlistQueryKey, () => prevState);
      },
      onSettled: ({ cardlistQueryKey }) => {
        queryClient.invalidateQueries(cardlistQueryKey);
      },
    }
  );

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const droppableId = result.destination.droppableId;
    const draggableId = result.draggableId;

    // *** If cardlist is being dragged
    if (droppableId === "workspace" && draggableId.startsWith("draglist")) {
      handleCardlistDrag({
        result,
        queryClient,
        queryKey,
        updateCardListOrderMutation,
      });
    }
    // *** If card is being dragged and dropped
    if (droppableId.startsWith("droplist")) {
      const newParentCardlistId = +droppableId.split("#")[1];
      const oldParentCardlistId = +draggableId.split("#")[0];
      if (oldParentCardlistId === newParentCardlistId) {
        // If card is being dropped to same cardlist
        handleCardDropInSameCardlist({
          result,
          updateCardOrderMutation,
          queryClient,
        });
      } else {
        // If card is being dropped to a different cardlist
        handleCardDropInDifferentCardlist({
          result,
          updateCardOrderMutation,
          queryClient,
        });
      }
    }
  };

  return { isLoading, error, listOfCardList, onAddCardListHandler, onDragEnd };
};
