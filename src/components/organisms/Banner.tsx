"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import BannerItem from "../molecules/BannerItem";
import type { BannerType } from "@/src/services/banner";
import { useBannerCarousel } from "@/src/hooks/useBannerCarousel";

type Props = {
  bannerList?: BannerType[];
};

const Banner = ({ bannerList }: Props) => {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const language = i18n.language as "ko" | "en";

  const { currentIndex, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useBannerCarousel({
      itemCount: bannerList?.length || 0,
      autoSlideInterval: 5000,
    });

  if (!bannerList || bannerList.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* 배너 슬라이드 */}
      <div
        ref={containerRef}
        className="relative w-full h-44 overflow-hidden bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerList.map((banner, index) => (
            <div key={index} className="w-full shrink-0">
              <BannerItem
                src={language === "en" ? banner.en_image : banner.ko_image}
                alt={banner.name}
                link={language === "en" ? banner.en_link : banner.ko_link}
                buttonText={
                  language === "en"
                    ? banner.en_button_text
                    : banner.ko_button_text
                }
                description={
                  language === "en"
                    ? banner.en_description
                    : banner.ko_description
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-5 flex justify-center gap-2 z-10 text-white w-12 rounded-md bg-[rgba(0,0,0,70%)]">
        {currentIndex + 1}/{bannerList.length}
      </div>
    </div>
  );
};

export default Banner;
