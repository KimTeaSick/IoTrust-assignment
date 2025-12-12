"use client";

import { useMemo } from "react";
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
import { useLanguage } from "@/src/hooks/useLanguage";
import { useFavorites } from "@/src/hooks/useFavorites";
import { useSearch } from "@/src/hooks/useSearch";
import { useDeleteModal } from "@/src/hooks/useDeleteModal";
import { useBottomSheet } from "@/src/hooks/useBottomSheet";
import { useDAppData } from "@/src/hooks/useDAppData";
import { usePlatform } from "@/src/hooks/usePlatform";

const Main = () => {
  const { t } = useTranslation();

  // Stores
  const {
    data: dAppData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isDAppLoading,
  } = useDAppListStore();
  const { data: initialFavoritesList } = useFavoritesListStore();
  const { data: bannerData } = useBannerStore();

  // Custom Hooks
  const { platform } = usePlatform();
  const { language, toggleLanguage, getDescription } = useLanguage();
  const { favoritesList, removeFromFavorites } = useFavorites(
    initialFavoritesList,
    platform,
    language
  );
  const { searchQuery, setSearchQuery, filterItems } = useSearch();
  const {
    isOpen: isModalOpen,
    openModal,
    closeModal,
    confirmDelete,
  } = useDeleteModal();
  const {
    isOpen: isBottomSheetOpen,
    selectedItem,
    openSheet,
    closeSheet,
  } = useBottomSheet();
  const { dAppList } = useDAppData(dAppData, platform, language);

  // 필터링된 리스트
  const filteredFavoritesList = useMemo(
    () => filterItems(favoritesList, searchQuery),
    [favoritesList, searchQuery, filterItems]
  );

  const filteredDAppList = useMemo(
    () => filterItems(dAppList, searchQuery),
    [dAppList, searchQuery, filterItems]
  );

  return (
    <div className="flex flex-col w-sm min-h-screen">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={t("search_placeholder")}
        onLanguageToggle={toggleLanguage}
        language={language}
      />
      <Banner bannerList={bannerData} />
      <h2 className="text-lg p-4 border-b border-gray-300">
        {t("dapp_favorite_title")}
      </h2>
      <List
        data={filteredFavoritesList}
        isFavoritesItem={true}
        onDeleteItem={openModal}
        onClickItem={openSheet}
      />
      <h2 className="text-lg p-4 border-b border-gray-300">
        {t("dapp_list_title")}
      </h2>
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
          onClickItem={openSheet}
        />
      )}
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => confirmDelete(removeFromFavorites)}
      />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeSheet}
        name={selectedItem?.name || ""}
        description={selectedItem ? getDescription(selectedItem) : ""}
        url={selectedItem?.url || ""}
        src={selectedItem?.icon || ""}
      />
    </div>
  );
};

export default Main;
