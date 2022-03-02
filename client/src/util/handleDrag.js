import { putCards } from "../api/card-api";

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

// Handling cardlist drag
export const handleCardlistDrag = ({
  result,
  queryClient,
  queryKey,
  updateCardListOrderMutation,
}) => {
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;

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

  updateCardListOrderMutation({
    updatedList,
    apiPayload,
  });
};

// Handles card drop within same cardlist
export const handleCardDropInSameCardlist = ({
  result,
  updateCardOrderMutation,
  queryClient,
}) => {
  const droppableId = result.destination.droppableId;
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;
  const newParentCardlistId = +droppableId.split("#")[1];
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
  const promise = putCards(apiPayload);
  updateCardOrderMutation({
    promise,
    updatedList: updatedList,
    cardlistQueryKey: ["cardlist", newParentCardlistId],
  });
};

// Handles card drop to a different cardlist
export const handleCardDropInDifferentCardlist = ({
  result,
  updateCardOrderMutation,
  queryClient,
}) => {
  const droppableId = result.destination.droppableId;
  const draggableId = result.draggableId;
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;
  const newParentCardlistId = +droppableId.split("#")[1];
  const oldParentCardlistId = +draggableId.split("#")[0];
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
  updateCardOrderMutation({
    promise,
    updatedList: updatedListNewParent,
    cardlistQueryKey: ["cardlist", newParentCardlistId],
  });
  updateCardOrderMutation({
    promise,
    updatedList: updatedListOldParent,
    cardlistQueryKey: ["cardlist", oldParentCardlistId],
  });
};
