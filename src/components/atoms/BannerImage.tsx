import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const BannerImage = ({ src, alt }: Props) => {
  return (
    <div className="relative w-full h-full">
      <Image
        fill
        alt={alt}
        style={{ objectFit: "contain" }}
        src={`https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/${src}`}
        priority
        quality={85}
        sizes="100vw"
      />
    </div>
  );
};

export default BannerImage;
