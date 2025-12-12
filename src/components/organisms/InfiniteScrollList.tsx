"use client";

import { useEffect, useRef, useState } from "react";
import ListItem from "../molecules/ListItem";
import ListItemSkeleton from "../atoms/ListItemSkeleton";
import { DAppItem } from "@/src/services/list";

type Props = {
  data?: DAppItem[];
  isFavoritesItem?: boolean;
  onDeleteItem?: (item: DAppItem) => void;
  onClickItem?: (item: DAppItem) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
};

const InfiniteScrollList = ({
  data,
  isFavoritesItem,
  onDeleteItem,
  onClickItem,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) {
      setLanguage("en");
    } else {
      setLanguage("ko");
    }
  }, []);

  const getDescription = (item: any) => {
    if (language === "en" && item.en_description) {
      return item.en_description;
    }
    return item.ko_description || item.en_description || "";
  };

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage?.();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allItems = data || [];

  return (
    <div className="flex flex-col w-full">
      {allItems.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          name={item.name}
          descript={getDescription(item)}
          isFavoritesItem={isFavoritesItem}
          onDelete={onDeleteItem ? () => onDeleteItem(item) : undefined}
          onClick={onClickItem ? () => onClickItem(item) : undefined}
        />
      ))}

      {/* 로딩 인디케이터 및 Observer Target */}
      {hasNextPage && (
        <div ref={observerRef} className="w-full">
          {isFetchingNextPage &&
            Array.from({ length: 3 }).map((_, index) => (
              <ListItemSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollList;
