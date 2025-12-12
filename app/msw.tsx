"use client";

import { useEffect, useState } from "react";
import { ENV, isDevelopment, isStaging } from "@/src/config/env";

export default function MSWInit({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 개발/스테이징 환경에서만 MSW 사용 (실제 프로덕션에서는 실제 API 사용)
      if (isDevelopment || isStaging) {
        const { worker } = await import("@/src/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
        });
      }
      setMswReady(true);
    };

    init();
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
