type Props = {
  name: string;
  descript: string;
  isFavoritesItem?: boolean;
};

const ListInfo = ({ name, descript, isFavoritesItem }: Props) => {
  return (
    <div
      className={[
        "flex flex-col items-start justify-start",
        isFavoritesItem ? "w-[60%]" : "w-[80%]",
      ].join(" ")}
    >
      <p className="text-base truncate w-full">{name}</p>
      <p className="text-sm truncate w-full">{descript}</p>
    </div>
  );
};

export default ListInfo;
