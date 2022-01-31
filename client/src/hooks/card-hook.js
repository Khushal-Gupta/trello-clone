import { useQuery } from "react-query";
import { findOneCard } from "../api/card-api";

export const useCardHook = (cardId) => {
  const {
    isLoading,
    error,
    data: { title },
  } = useQuery(["card", cardId], () => findOneCard(cardId), {
    initialData: { title: "....." },
  });

  return { title, isLoading, error };
};
