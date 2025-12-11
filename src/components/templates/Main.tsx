"use client";

import List from "../organisms/List";
import {
  useDAppListStore,
  useFavoritesListStore,
} from "@/src/stores/server/dApp";

const Main = () => {
  const { data: dAppList } = useDAppListStore();
  const { data: favotitesList } = useFavoritesListStore();
  console.log("favotitesList", favotitesList);

  return (
    <div className="flex flex-col w-sm h-full">
      <List data={favotitesList} isFavoritesItem={true} />

      <List data={dAppList} />
    </div>
  );
};

export default Main;
