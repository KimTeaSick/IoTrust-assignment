type Props = {
  name: string;
  descript: string;
};

const ListInfo = ({ name, descript }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p>{name}</p>
      <p className="truncate w-full">{descript}</p>
    </div>
  );
};

export default ListInfo;
