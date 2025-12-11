import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const ListIcon = ({ src, alt }: Props) => {
  return (
    <Image
      alt={alt}
      width={50}
      height={50}
      src={`https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/${src}`}
    />
  );
};

export default ListIcon;
