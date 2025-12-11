import { get } from ".";

export const getList = async () => {
  const response = await get("http://localhost:3000/api/user");
  return response.json();
};
