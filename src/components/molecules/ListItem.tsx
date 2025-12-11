import ListDeleteButton from "../atoms/ListDeleteButton";
import ListIcon from "../atoms/ListIcon";
import ListInfo from "../atoms/ListInfo";

type Props = {
  descript: string;
  name: string;
  icon: string;
  isFavoritesItem?: boolean;
};

const ListItem = ({ descript, name, icon, isFavoritesItem }: Props) => {
  return (
    <div className="flex justify-between p-3 border-t border-b">
      <ListIcon src={icon} alt="" />
      <ListInfo descript={descript} name={name} />
      {isFavoritesItem && <ListDeleteButton />}
    </div>
  );
};

export default ListItem;
