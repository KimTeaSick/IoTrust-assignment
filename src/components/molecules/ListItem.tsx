import ListDeleteButton from "../atoms/ListDeleteButton";
import ListIcon from "../atoms/ListIcon";
import ListInfo from "../atoms/ListInfo";

const ListItem = () => {
  return (
    <div className="flex justify-between p-3 border-t border-b">
      <ListIcon
        src="https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_uniswap.png"
        alt=""
      />
      <ListInfo title="title" url="url" />
      <ListDeleteButton />
    </div>
  );
};

export default ListItem;
