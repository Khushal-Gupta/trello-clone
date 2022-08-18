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
  } = useQuery(queryKey, () => findOneCardlist(cardlistId), {
    initialData: { title: "Loading..", cards: [] },
  });

  const { mutate: addCardMutation } = useMutation(postCard, {
    onSuccess: (newCard) => {
      queryClient.setQueryData(queryKey, (prevState) => ({
        ...prevState,
        cards: [...prevState.cards, newCard],
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const addCard = (newCardTitle) => {
    const newCardObject = {
      title: newCardTitle,
      description: "Add a more detailed description...",
      order: listOfCard.length,
      cardlist: cardlistId,
    };
    addCardMutation(newCardObject);
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
    isLoading,
    error,
  };
};
