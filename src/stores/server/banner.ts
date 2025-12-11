import { getBanner } from "@/src/services/banner";
import { useQuery } from "@tanstack/react-query";

export const useBannerStore = () => {
  const query = useQuery({
    queryKey: ["useBannerStore"],
    queryFn: async () => await getBanner(),
  });
  return query;
};
