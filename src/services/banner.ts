import { get } from ".";
import { ENV } from "@/src/config/env";

export type BannerType = {
  name: string;
  ko_image: string;
  en_image: string;
  ko_description?: string;
  en_description?: string;
  ko_link?: string;
  en_link?: string;
  ko_button_text?: string;
  en_button_text?: string;
};

export const getBanner = async (): Promise<BannerType> => {
  const response = await get(`${ENV.API_BASE_URL}/api/bannerList`);
  return response.json();
};
