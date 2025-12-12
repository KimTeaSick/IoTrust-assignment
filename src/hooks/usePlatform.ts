import { useState, useEffect } from "react";

export type Platform = "ios" | "android" | "desktop";

export const usePlatform = () => {
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    } else if (/android/.test(userAgent)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }
  }, []);

  return { platform };
};
