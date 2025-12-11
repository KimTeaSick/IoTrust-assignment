import { get } from ".";

export const getDAppList = async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
  const response = await get(`http://localhost:3000/api/dAppList?page=${page}&limit=${limit}`);
  return response.json();
};

export const getFavoritesList = async () => {
  const response = await get("http://localhost:3000/api/favoritesList");
  return response.json();
};
