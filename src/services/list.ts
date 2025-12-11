import { get } from ".";

export const getDAppList = async () => {
  const response = await get("http://localhost:3000/api/dAppList");
  return response.json();
};

export const getFavoritesList = async () => {
  const response = await get("http://localhost:3000/api/favoritesList");
  return response.json();
};
