import ListDeleteButton from "../atoms/ListDeleteButton";
import ListIcon from "../atoms/ListIcon";
import ListInfo from "../atoms/ListInfo";

type Props = {
  descript: string;
  name: string;
  icon: string;
  url: string;
  isFavoritesItem?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
};

const ListItem = ({
  descript,
  name,
  icon,
  url,
  isFavoritesItem,
  onDelete,
  onClick,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    // 삭제 버튼 클릭 시에는 아이템 클릭 이벤트 발생하지 않도록
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    onClick?.();
  };

  return (
    <div
      className="flex items-center w-sm py-3 gap-3 border-b border-gray-300 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <ListIcon src={icon} alt="" />
      <ListInfo
        descript={descript}
        name={name}
        url={url}
        isFavoritesItem={isFavoritesItem}
      />
      {isFavoritesItem && onDelete && <ListDeleteButton onClick={onDelete} />}
    </div>
  );
};

export default ListItem;
