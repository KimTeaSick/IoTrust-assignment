"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import BannerItem from "../molecules/BannerItem";
import type { BannerType } from "@/src/services/banner";

type Props = {
  bannerList?: BannerType[];
};

const Banner = ({ bannerList }: Props) => {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const language = i18n.language as "ko" | "en";

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    if (!bannerList || bannerList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerList]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!bannerList) return;

    const minSwipeDistance = 50;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      // 왼쪽으로 스와이프 (다음)
      setCurrentIndex((prev) => (prev + 1) % bannerList.length);
    } else if (distance < -minSwipeDistance) {
      // 오른쪽으로 스와이프 (이전)
      setCurrentIndex((prev) =>
        prev === 0 ? bannerList.length - 1 : prev - 1
      );
    }
  };

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
