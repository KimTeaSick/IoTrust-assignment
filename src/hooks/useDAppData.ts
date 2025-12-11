import { useMemo } from "react";

export const useDAppData = (dAppData: any) => {
  const dAppList = useMemo(() => {
    if (!dAppData?.pages) return [];
    return dAppData.pages.flatMap((page: any) => page.data);
  }, [dAppData]);

  return { dAppList };
};
