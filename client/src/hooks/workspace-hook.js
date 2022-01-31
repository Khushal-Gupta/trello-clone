import { useQuery, useQueryClient, useMutation } from "react-query";

import { findCardlists, postCardlist, putCardlists } from "../api/cardlist-api";

export const useWorkspaceHook = () => {
  const queryKey = "workspace";
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: listOfCardList,
  } = useQuery(queryKey, () => findCardlists());

  const addCardListMutationHook = useMutation(
    (newCardListObject) => postCardlist(newCardListObject),
    {
      onSuccess: (newCardList) => {
        queryClient.setQueryData(queryKey, (prevlist) => [
          ...prevlist,
          newCardList,
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

  const onAddCardListHandler = (newCardListTitle) => {
    const newCardListOject = {
      title: newCardListTitle,
      order: listOfCardList.length,
    };
    addCardListMutationHook.mutate(newCardListOject);
  };

  const updateCardListOrderMutationHook = useMutation(
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
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const droppableId = result.destination.droppableId;
    const draggableId = result.draggableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (droppableId === "workspace" && draggableId.startsWith("draglist")) {
      let prevList = queryClient.getQueryData(queryKey);
      let updatedList = [...prevList];
      const [removed] = updatedList.splice(sourceIndex, 1);
      updatedList.splice(destinationIndex, 0, removed);
      updatedList = updatedList.map((list, index) => ({
        ...list,
        updatedOrder: index,
      }));

      // cardlists whose updated order are different that previous one
      const updatedItems = updatedList.filter(
        (list) => list.order !== list.updatedOrder
      );

      updatedList = updatedList.map((list) => ({
        ...list,
        order: list.updatedOrder,
      }));
      // This payload be used to send put request to change order
      const apiPayload = updatedItems.reduce(
        (acc, list) => ({ ...acc, [list.id]: { order: list.updatedOrder } }),
        {}
      );
      updateCardListOrderMutationHook.mutate({
        updatedList,
        apiPayload,
      });
    }
  };

  return { isLoading, error, listOfCardList, onAddCardListHandler, onDragEnd };
};
