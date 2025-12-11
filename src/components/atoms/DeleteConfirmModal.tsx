import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: Props) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,30%)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-lg font-semibold mb-4">{t("dapp_favorite_delete")}</h2>
        <p className="text-gray-600 mb-6">
          {t("dapp_favorite_delete_confirm")}
        </p>
        <p className="text-gray-800 font-medium mb-6">"{itemName}"</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            {t("button_cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            {t("button_confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
