import { useState } from "react";

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openSheet = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return {
    isOpen,
    selectedItem,
    openSheet,
    closeSheet,
  };
};
