"use client";

import { useEffect } from "react";
import List from "../organisms/List";
import { getList } from "@/src/services/list";

const Main = () => {
  const test = async () => {
    const result = await getList();
    console.log("API Result:", result);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div className="flex w-sm h-full">
      <List />
    </div>
  );
};

export default Main;
