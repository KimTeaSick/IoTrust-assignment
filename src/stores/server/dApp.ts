import { getDAppList, getFavoritesList } from "@/src/services/list";
import { useQuery } from "@tanstack/react-query";

export const useDAppListStore = () => {
  const query = useQuery({
    queryKey: ["dAppList"],
    queryFn: async () => await getDAppList(),
  });
  return query;
};

export const useFavoritesListStore = () => {
  const query = useQuery({
    queryKey: ["favoritesList"],
    queryFn: async () => await getFavoritesList(),
  });
  return query;
};
