type Props = {
  name: string;
  descript: string;
};

const ListInfo = ({ name, descript }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>{descript}</p>
    </div>
  );
};

export default ListInfo;
