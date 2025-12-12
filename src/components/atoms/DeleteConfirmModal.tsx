import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,30%)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-lg font-semibold">
            {t("dapp_favorite_delete_confirm_title")}
          </h2>
          <div className="border w-full border-dashed border-gray-200" />
          <p className="text-gray-600 mb-6 text-center">
            {t("dapp_favorite_delete_confirm")}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 w-full rounded border border-gray-200 shadow"
          >
            {t("button_cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-gray-600 rounded w-full border border-gray-200 shadow"
          >
            {t("button_confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
