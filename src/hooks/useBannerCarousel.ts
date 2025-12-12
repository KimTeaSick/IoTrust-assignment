import { useState, useEffect } from "react";

type UseBannerCarouselProps = {
  itemCount: number;
  autoSlideInterval?: number;
};

export const useBannerCarousel = ({
  itemCount,
  autoSlideInterval = 5000,
}: UseBannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    if (itemCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [itemCount, autoSlideInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      // 왼쪽으로 스와이프 (다음)
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    } else if (distance < -minSwipeDistance) {
      // 오른쪽으로 스와이프 (이전)
      setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  };

  return {
    currentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
