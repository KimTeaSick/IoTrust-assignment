import { useTranslation } from "react-i18next";

type Props = {
  onClick: () => void;
};

const ListDeleteButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
    >
      {t("dapp_favorite_delete")}
    </button>
  );
};

export default ListDeleteButton;
