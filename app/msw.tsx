"use client";

import { useEffect, useState } from "react";

export default function MSWInit({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === "development") {
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
