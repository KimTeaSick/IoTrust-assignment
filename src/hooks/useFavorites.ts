import { useState, useEffect, useMemo } from "react";
import type { Platform } from "./usePlatform";
import type { DAppItem } from "@/src/services/list";

export const useFavorites = (
  initialData?: DAppItem[],
  platform?: Platform,
  language?: "ko" | "en"
) => {
  const [favoritesList, setFavoritesList] = useState<DAppItem[]>([]);

  useEffect(() => {
    if (initialData) {
      setFavoritesList(initialData);
    }
  }, [initialData]);

  // 플랫폼과 언어 필터링된 즐겨찾기 목록
  const filteredFavoritesList = useMemo(() => {
    if (!platform || !language) return favoritesList;

    return favoritesList.filter((item) => {
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
  }, [favoritesList, platform, language]);

  const removeFromFavorites = (item: DAppItem) => {
    setFavoritesList((prev) =>
      prev.filter((favItem) => favItem.name !== item.name)
    );
  };

  return {
    favoritesList: filteredFavoritesList,
    removeFromFavorites,
  };
};
