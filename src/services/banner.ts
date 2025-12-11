import { get } from ".";

export const getBanner = async () => {
  const response = await get("http://localhost:3000/api/bannerList");
  return response.json();
};
