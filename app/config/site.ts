export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  "https://example.com/form-endpoint";

export const analyticsConfig = {
  enabled: process.env.NEXT_PUBLIC_CF_ANALYTICS_ENABLED === "true",
  token: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? "",
};
