import { useState, useEffect } from "react";

export const useFavorites = (initialData?: any[]) => {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      setFavoritesList(initialData);
    }
  }, [initialData]);

  const removeFromFavorites = (item: any) => {
    setFavoritesList((prev) =>
      prev.filter((favItem) => favItem.name !== item.name)
    );
  };

  return { favoritesList, removeFromFavorites };
};
