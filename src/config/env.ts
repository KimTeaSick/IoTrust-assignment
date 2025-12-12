export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || "development",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
} as const;

export const isDevelopment = ENV.NEXT_PUBLIC_ENV === "development";
export const isStaging = ENV.NEXT_PUBLIC_ENV === "staging";
export const isProduction = ENV.NEXT_PUBLIC_ENV === "production";
