type Props = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
};

const BannerButton = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm shadow-md"
    >
      {text}
    </button>
  );
};

export default BannerButton;
