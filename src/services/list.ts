import { get } from ".";
import { ENV } from "@/src/config/env";

export type DAppItem = {
  name: string;
  icon: string;
  url: string;
  en_description?: string;
  ko_description?: string;
  network?: string;
  supportedPlatforms?: ("ios" | "android" | "desktop")[];
  supportedLanguages?: ("ko" | "en")[];
};

export type DAppListResponse = {
  data: DAppItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export const getDAppList = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<DAppListResponse> => {
  const response = await get(
    `${ENV.API_BASE_URL}/api/dAppList?page=${page}&limit=${limit}`
  );
  return response.json();
};

export const getFavoritesList = async (): Promise<DAppItem[]> => {
  const response = await get(`${ENV.API_BASE_URL}/api/favoritesList`);
  return response.json();
};
