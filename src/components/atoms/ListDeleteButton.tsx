import Bookmark from "@/src/assets/svg/Bookmark";
import { useTranslation } from "react-i18next";

type Props = {
  onClick: () => void;
};

const ListDeleteButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="px-1 py-1 text-sm text-[#999] w-12 h-12 rounded"
    >
      <Bookmark />
      {t("dapp_favorite_delete")}
    </button>
  );
};

export default ListDeleteButton;
