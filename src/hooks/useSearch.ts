import { useState, useMemo } from "react";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterItems = (items: any[] | undefined, query: string) => {
    if (!items) return [];
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();

    return items.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const koDescription = item.ko_description?.toLowerCase() || "";
      const enDescription = item.en_description?.toLowerCase() || "";
      const kor = item.kor?.toLowerCase() || "";
      const eng = item.eng?.toLowerCase() || "";

      return (
        name.includes(lowerQuery) ||
        koDescription.includes(lowerQuery) ||
        enDescription.includes(lowerQuery) ||
        kor.includes(lowerQuery) ||
        eng.includes(lowerQuery)
      );
    });
  };

  return { searchQuery, setSearchQuery, filterItems };
};
