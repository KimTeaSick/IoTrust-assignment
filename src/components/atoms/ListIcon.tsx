import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const ListIcon = ({ src, alt }: Props) => {
  return <Image src={src} alt={alt} width={50} height={50} />;
};

export default ListIcon;
