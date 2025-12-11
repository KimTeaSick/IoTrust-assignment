type Props = {
  language: "ko" | "en";
  onClick: () => void;
};

const LanguageToggleButton = ({ language, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[60px]"
    >
      {language === "ko" ? "한국어" : "English"}
    </button>
  );
};

export default LanguageToggleButton;
