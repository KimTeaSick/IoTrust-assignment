import { useMemo } from "react";
import type { Platform } from "./usePlatform";
import type { DAppItem } from "@/src/services/list";

export const useDAppData = (
  dAppData: any,
  platform: Platform,
  language: "ko" | "en"
) => {
  const dAppList = useMemo(() => {
    if (!dAppData?.pages) return [];

    const allItems: DAppItem[] = dAppData.pages.flatMap((page: any) => page.data);

    // 플랫폼과 언어 필터링
    return allItems.filter((item) => {
      // supportedPlatforms가 있는 경우, 현재 플랫폼이 포함되어 있는지 확인
      if (item.supportedPlatforms && item.supportedPlatforms.length > 0) {
        if (!item.supportedPlatforms.includes(platform)) {
          return false;
        }
      }

      // supportedLanguages가 있는 경우, 현재 언어가 포함되어 있는지 확인
      if (item.supportedLanguages && item.supportedLanguages.length > 0) {
        if (!item.supportedLanguages.includes(language)) {
          return false;
        }
      }

      return true;
    });
  }, [dAppData, platform, language]);

  return { dAppList };
};
