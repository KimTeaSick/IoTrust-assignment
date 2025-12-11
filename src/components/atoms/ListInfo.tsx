type Props = {
  name: string;
  descript: string;
};

const ListInfo = ({ name, descript }: Props) => {
  return (
    <div className="w-[80%] flex flex-col items-start justify-start">
      <p>{name}</p>
      <p className="truncate w-full">{descript}</p>
    </div>
  );
};

export default ListInfo;
