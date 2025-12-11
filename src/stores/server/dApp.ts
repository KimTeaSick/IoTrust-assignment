import { getDAppList, getFavoritesList } from "@/src/services/list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useDAppListStore = () => {
  const query = useInfiniteQuery({
    queryKey: ["dAppList"],
    queryFn: async ({ pageParam = 1 }) => await getDAppList({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
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
