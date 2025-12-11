import { http, HttpResponse } from "msw";
import DAPP from "./dapp.json";

export const handlers = [
  http.get("/api/dAppList", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = DAPP.slice(startIndex, endIndex);

    // 로딩 시뮬레이션 (500ms 지연)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json({
            data: paginatedData,
            total: DAPP.length,
            page,
            limit,
            hasMore: endIndex < DAPP.length,
          })
        );
      }, 500);
    });
  }),

  http.get("/api/favoritesList", () => {
    return HttpResponse.json([
      {
        name: "OpenSea, the largest NFT marketplace",
        icon: "icon_opensea.png",
        url: "https://opensea.io",
      },
      {
        name: "MoonPay",
        icon: "icon_moonpay.png",
        url: "https://buy.moonpay.com/v2/buy",
      },
      {
        name: "Rarible - NFT Marketplace for Brands, Communities and Traders",
        icon: "icon_rarible.png",
        url: " https://rarible.com/",
      },
    ]);
  }),

  http.get("/api/bannerList", () => {
    return HttpResponse.json([
      {
        name: "Campaign MAPO Airdrop",
        ko_image: "banner_mapo_kr.png",
        en_image: "banner_mapo_en.png",
        ko_link:
          "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
        en_link:
          "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
      },
      {
        name: "D'CENT Wallet",
        ko_image: "banner_dcent.png",
        en_image: "banner_dcent.png",
        ko_description:
          "디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!",
        en_description: "Enhance your security with D'CENT biometric wallet",
        ko_link:
          "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
        en_link:
          "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
        ko_button_text: "구매하기",
        en_button_text: "Buy Now",
      },
      {
        name: "D'CENT Blog",
        ko_image: "banner_blog.png",
        en_image: "banner_blog.png",
        ko_description:
          "새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!",
        en_description:
          "Visit the new D’CENT Blog to explore the latest updates first!",
        ko_link: "https://store-kr.dcentwallet.com/blogs/post",
        en_link: "https://store.dcentwallet.com/blogs/post",
        ko_button_text: "확인하기",
        en_button_text: "Explore",
      },
    ]);
  }),
];
