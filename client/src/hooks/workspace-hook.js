import { useQuery, useQueryClient, useMutation } from "react-query";

import { findCardlists, postCardlist } from "../api/cardlist-api";

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

  return { isLoading, error, listOfCardList, onAddCardListHandler };
};
