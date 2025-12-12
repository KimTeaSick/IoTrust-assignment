"use client";

import { useMemo } from "react";
import List from "../organisms/List";
import InfiniteScrollList from "../organisms/InfiniteScrollList";
import SearchBar from "../molecules/SearchBar";
import DeleteConfirmModal from "../atoms/DeleteConfirmModal";
import BottomSheet from "../molecules/BottomSheet";
import ListItemSkeleton from "../atoms/ListItemSkeleton";
import EmptyState from "../atoms/EmptyState";
import ErrorState from "../atoms/ErrorState";
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
    isError: isDAppError,
    error: dAppError,
    refetch: refetchDAppList,
  } = useDAppListStore();
  const {
    data: initialFavoritesList,
    isError: isFavoritesError,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useFavoritesListStore();
  const {
    data: bannerData,
    isError: isBannerError,
    error: bannerError,
  } = useBannerStore();

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
      {!isBannerError && <Banner bannerList={bannerData} />}

      <h2 className="text-base py-3 border-b border-gray-300">
        {t("dapp_favorite_title")}
      </h2>
      {isFavoritesError ? (
        <ErrorState
          message={t("error_favorites_title") || "즐겨찾기를 불러올 수 없습니다"}
          description={
            t("error_favorites_description") ||
            "네트워크 연결을 확인하고 다시 시도해주세요."
          }
          onRetry={refetchFavorites}
        />
      ) : filteredFavoritesList.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? t("empty_search_favorites") || "검색 결과가 없습니다"
              : t("empty_favorites") || "즐겨찾기가 비어있습니다"
          }
          description={
            searchQuery
              ? t("empty_search_favorites_description") ||
                "다른 검색어를 입력해보세요"
              : t("empty_favorites_description") ||
                "즐겨찾기를 추가해보세요"
          }
        />
      ) : (
        <List
          data={filteredFavoritesList}
          isFavoritesItem={true}
          onDeleteItem={openModal}
          onClickItem={openSheet}
        />
      )}

      <h2 className="text-base py-3 border-b border-gray-300">
        {t("dapp_list_title")}
      </h2>
      {isDAppLoading ? (
        <div className="flex flex-col w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      ) : isDAppError ? (
        <ErrorState
          message={t("error_dapp_title") || "dApp 리스트를 불러올 수 없습니다"}
          description={
            t("error_dapp_description") ||
            "네트워크 연결을 확인하고 다시 시도해주세요."
          }
          onRetry={refetchDAppList}
        />
      ) : filteredDAppList.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? t("empty_search_dapp") || "검색 결과가 없습니다"
              : t("empty_dapp") || "dApp이 없습니다"
          }
          description={
            searchQuery
              ? t("empty_search_dapp_description") ||
                "다른 검색어를 입력해보세요"
              : t("empty_dapp_description") || "dApp을 추가해주세요"
          }
        />
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
