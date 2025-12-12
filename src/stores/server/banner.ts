import { getBanner } from "@/src/services/banner";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/src/lib/queryKeys";

export const useBannerStore = () => {
  const query = useQuery({
    queryKey: queryKeys.banners.list(),
    queryFn: async () => await getBanner(),
  });
  return query;
};
