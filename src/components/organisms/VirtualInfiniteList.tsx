"use client";

import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import ListItem from "../molecules/ListItem";
import ListItemSkeleton from "../atoms/ListItemSkeleton";
import type { DAppItem } from "@/src/services/list";

type Props = {
  data?: DAppItem[];
  isFavoritesItem?: boolean;
  onDeleteItem?: (item: DAppItem) => void;
  onClickItem?: (item: DAppItem) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
};

const VirtualInfiniteList = ({
  data,
  isFavoritesItem,
  onDeleteItem,
  onClickItem,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const parentRef = useRef<HTMLDivElement>(null);

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

  const allItems = data || [];

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage?.();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return (
    <div ref={parentRef} className="flex flex-col w-full overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const isLoaderRow = virtualItem.index > allItems.length - 1;
          const item = allItems[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  <ListItemSkeleton />
                ) : null
              ) : (
                <ListItem
                  url={item.url}
                  icon={item.icon}
                  name={item.name}
                  descript={getDescription(item)}
                  isFavoritesItem={isFavoritesItem}
                  onDelete={onDeleteItem ? () => onDeleteItem(item) : undefined}
                  onClick={onClickItem ? () => onClickItem(item) : undefined}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualInfiniteList;
