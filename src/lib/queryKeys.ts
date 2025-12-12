export const queryKeys = {
  all: ["app"] as const,

  dApps: {
    all: ["app", "dApps"] as const,
    lists: () => [...queryKeys.dApps.all, "list"] as const,
    list: (page?: number, limit?: number) =>
      [...queryKeys.dApps.lists(), { page, limit }] as const,
  },

  favorites: {
    all: ["app", "favorites"] as const,
    list: () => [...queryKeys.favorites.all, "list"] as const,
  },

  banners: {
    all: ["app", "banners"] as const,
    list: () => [...queryKeys.banners.all, "list"] as const,
  },
} as const;
