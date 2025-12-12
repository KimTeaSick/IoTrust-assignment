import BannerButton from "../atoms/BannerButton";
import BannerImage from "../atoms/BannerImage";

type Props = {
  src: string;
  alt: string;
  link?: string;
  buttonText?: string;
  description?: string;
};

const BannerItem = ({ src, alt, link, buttonText, description }: Props) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      <BannerImage src={src} alt={alt} />
      {/* 오버레이 with description and CTA */}
      {(description || buttonText) && (
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {description && (
            <p className="text-white text-sm mb-3">{description}</p>
          )}
          {buttonText && (
            <BannerButton
              text={buttonText}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BannerItem;
