"use client";

import { useState, useEffect, useMemo } from "react";
import List from "../organisms/List";
import InfiniteScrollList from "../organisms/InfiniteScrollList";
import SearchBar from "../molecules/SearchBar";
import DeleteConfirmModal from "../atoms/DeleteConfirmModal";
import BottomSheet from "../molecules/BottomSheet";
import ListItemSkeleton from "../atoms/ListItemSkeleton";
import {
  useDAppListStore,
  useFavoritesListStore,
} from "@/src/stores/server/dApp";
import { useTranslation } from "react-i18next";
import Banner from "../organisms/Banner";
import { useBannerStore } from "@/src/stores/server/banner";

const Main = () => {
  const { t } = useTranslation();

  const {
    data: dAppData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isDAppLoading,
  } = useDAppListStore();
  const { data: initialFavoritesList } = useFavoritesListStore();
  const { data: bannerData } = useBannerStore();

  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [language, setLanguage] = useState<"ko" | "en">("ko");

  // useInfiniteQuery에서 모든 페이지의 데이터를 평탄화
  const dAppList = useMemo(() => {
    if (!dAppData?.pages) return [];
    return dAppData.pages.flatMap((page) => page.data);
  }, [dAppData]);

  // 브라우저 언어 감지 및 i18n 언어 설정
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detectedLang = browserLang.startsWith("en") ? "en" : "ko";
    setLanguage(detectedLang);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    if (initialFavoritesList) {
      setFavoritesList(initialFavoritesList);
    }
  }, [initialFavoritesList]);

  // 검색 필터 함수
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

  // 필터링된 리스트
  const filteredFavoritesList = useMemo(
    () => filterItems(favoritesList, searchQuery),
    [favoritesList, searchQuery]
  );

  const filteredDAppList = useMemo(
    () => filterItems(dAppList, searchQuery),
    [dAppList, searchQuery]
  );

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setFavoritesList((prev) =>
        prev.filter((item) => item.name !== itemToDelete.name)
      );
    }
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedItem(null);
  };

  const getDescription = (item: any) => {
    if (language === "en" && item.en_description) {
      return item.en_description;
    }
    return item.ko_description || item.en_description || "";
  };

  return (
    <div className="flex flex-col w-sm min-h-screen">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t("search_placeholder")}
      />
      <Banner bannerList={bannerData} />
      <h2 className="text-lg font-semibold p-4">{t("dapp_favorite_title")}</h2>
      <List
        data={filteredFavoritesList}
        isFavoritesItem={true}
        onDeleteItem={handleDeleteClick}
        onClickItem={handleItemClick}
      />
      <h2 className="text-lg font-semibold p-4">{t("dapp_list_title")}</h2>
      {isDAppLoading ? (
        <div className="flex flex-col w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <InfiniteScrollList
          data={filteredDAppList}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onClickItem={handleItemClick}
        />
      )}
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name || ""}
      />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        name={selectedItem?.name || ""}
        description={selectedItem ? getDescription(selectedItem) : ""}
        url={selectedItem?.url || ""}
      />
    </div>
  );
};

export default Main;
