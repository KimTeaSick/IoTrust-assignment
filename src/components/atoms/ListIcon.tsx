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
      loading="lazy"
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    />
  );
};

export default ListIcon;
