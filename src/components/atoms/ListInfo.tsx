type Props = {
  name: string;
  descript: string;
};

const ListInfo = ({ name, descript }: Props) => {
  return (
    <div className="w-[80%] flex flex-col items-start justify-start">
      <p className="text-base">{name}</p>
      <p className="text-sm truncate w-full">{descript}</p>
    </div>
  );
};

export default ListInfo;
