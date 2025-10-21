export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_SUCCESS_REDIRECT_URL
    : process.env.NEXT_PUBLIC_DEV_SUCCESS_REDIRECT_URL;
