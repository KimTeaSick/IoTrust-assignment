export const get = async (url: string) => {
  try {
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error("GET 요청 실패:", error);
    throw error;
  }
};
