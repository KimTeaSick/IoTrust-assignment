type Props = {
  title: string;
  url: string;
};

const ListInfo = ({ title, url }: Props) => {
  return (
    <div>
      <p>title</p>
      <p>url</p>
    </div>
  );
};

export default ListInfo;
