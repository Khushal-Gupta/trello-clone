import { useQuery, useQueryClient, useMutation } from "react-query";
import { putCards } from "../api/card-api";

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

  const updateCardOrderMutationHook = useMutation(
    (variables) => variables.promise,
    {
      onMutate: async ({ updatedList, cardlistQueryKey }) => {
        await queryClient.cancelQueries(cardlistQueryKey);
        const { cards: previousList } =
          queryClient.getQueryData(cardlistQueryKey);

        queryClient.setQueryData(cardlistQueryKey, (prev) => ({
          ...prev,
          cards: updatedList,
        }));
        return { previousList };
      },
      onError: (error, { cardlistQueryKey }, { previousList }) => {
        queryClient.setQueryData(cardlistQueryKey, () => previousList);
        console.log(error);
      },
      onSettled: ({ cardlistQueryKey }, error) => {
        queryClient.invalidateQueries(cardlistQueryKey);
      },
    }
  );

  const generateApiPayload = (updatedList) => {
    // cardlists whose updated order are different that previous one
    const updatedItems = updatedList.filter((item) => {
      for (const prop of Object.keys(item.updated)) {
        if (item[prop] !== item.updated[prop]) {
          return true;
        }
      }
      return false;
    });

    // This payload be used to send put request to change order
    const apiPayload = updatedItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: { ...item.updated } }),
      {}
    );
    return apiPayload;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const droppableId = result.destination.droppableId;
    const draggableId = result.draggableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    // *** If cardlist is being dragged
    if (droppableId === "workspace" && draggableId.startsWith("draglist")) {
      let prevList = queryClient.getQueryData(queryKey);
      let updatedList = [...prevList];
      const [removed] = updatedList.splice(sourceIndex, 1);
      updatedList.splice(destinationIndex, 0, removed);
      updatedList = updatedList.map((list, index) => ({
        ...list,
        updated: {
          order: index,
        },
      }));

      const apiPayload = generateApiPayload(updatedList);

      updateCardListOrderMutationHook.mutate({
        updatedList,
        apiPayload,
      });
    }
    // *** If card is being dragged and dropped
    if (droppableId.startsWith("droplist")) {
      const newParentCardlistId = +droppableId.split("#")[1];
      const oldParentCardlistId = +draggableId.split("#")[0];
      if (oldParentCardlistId === newParentCardlistId) {
        // If cards are being shuffled within same list
        const { cards: prevList } = queryClient.getQueryData([
          "cardlist",
          newParentCardlistId,
        ]);
        let updatedList = [...prevList];
        const [removed] = updatedList.splice(sourceIndex, 1);
        updatedList.splice(destinationIndex, 0, removed);
        updatedList = updatedList.map((list, index) => ({
          ...list,
          updated: {
            order: index,
          },
        }));
        const apiPayload = generateApiPayload(updatedList);
        // putCards(apiPayload).finally(() =>
        //   queryClient.invalidateQueries(["cardlist", newParentCardlistId])
        // );
        const promise = putCards(apiPayload);
        updateCardOrderMutationHook.mutate({
          promise,
          updatedList: updatedList,
          cardlistQueryKey: ["cardlist", newParentCardlistId],
        });
      } else {
        // If card is being dropped to a different list
        let { cards: prevListNewParent } = queryClient.getQueryData([
          "cardlist",
          newParentCardlistId,
        ]);
        let { cards: prevListOldParent } = queryClient.getQueryData([
          "cardlist",
          oldParentCardlistId,
        ]);

        let updatedListOldParent = [...prevListOldParent];
        let [removed] = updatedListOldParent.splice(sourceIndex, 1);
        updatedListOldParent = updatedListOldParent.map((card, index) => ({
          ...card,
          updated: { order: index },
        }));

        removed = { ...removed, updated: { cardlist: newParentCardlistId } };
        let updatedListNewParent = [...prevListNewParent];
        updatedListNewParent.splice(destinationIndex, 0, removed);
        updatedListNewParent = updatedListNewParent.map((card, index) => ({
          ...card,
          updated: { order: index, ...card.updated },
        }));

        const apiPayload = {
          ...generateApiPayload(updatedListNewParent),
          ...generateApiPayload(updatedListOldParent),
        };

        const promise = putCards(apiPayload);
        updateCardOrderMutationHook.mutate({
          promise,
          updatedList: updatedListNewParent,
          cardlistQueryKey: ["cardlist", newParentCardlistId],
        });
        updateCardOrderMutationHook.mutate({
          promise,
          updatedList: updatedListOldParent,
          cardlistQueryKey: ["cardlist", oldParentCardlistId],
        });
      }
    }
  };

  return { isLoading, error, listOfCardList, onAddCardListHandler, onDragEnd };
};
