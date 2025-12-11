import { useState } from "react";

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const openModal = (item: any) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = (onConfirm: (item: any) => void) => {
    if (itemToDelete) {
      onConfirm(itemToDelete);
    }
    closeModal();
  };

  return {
    isOpen,
    itemToDelete,
    openModal,
    closeModal,
    confirmDelete,
  };
};
