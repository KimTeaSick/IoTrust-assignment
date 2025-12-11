"use client";

import { useState, useEffect } from "react";
import ListItem from "../molecules/ListItem";

type Props = {
  data?: any[];
  isFavoritesItem?: boolean;
  onDeleteItem?: (item: any) => void;
  onClickItem?: (item: any) => void;
};

const List = ({ data, isFavoritesItem, onDeleteItem, onClickItem }: Props) => {
  const [language, setLanguage] = useState<"ko" | "en">("ko");

  useEffect(() => {
    // 브라우저 언어 감지
    const browserLang = navigator.language.toLowerCase();
    // 영어 언어 코드 확인 (en, en-US, en-GB 등)
    if (browserLang.startsWith("en")) {
      setLanguage("en");
    } else {
      // 디폴트는 한국어
      setLanguage("ko");
    }
  }, []);

  const getDescription = (item: any) => {
    // 선택된 언어의 설명이 있으면 사용, 없으면 디폴트(한국어) 사용
    if (language === "en" && item.en_description) {
      return item.en_description;
    }
    return item.ko_description || item.en_description || "";
  };

  return (
    <div className="flex flex-col w-full">
      {data?.map((item, index) => (
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
    </div>
  );
};

export default List;
