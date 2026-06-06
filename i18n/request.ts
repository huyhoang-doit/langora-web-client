import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: {
      ...(await import(
        `../messages/${locale}/common.json`
      )).default,

      ...(await import(
        `../messages/${locale}/auth.json`
      )).default,

      ...(await import(
        `../messages/${locale}/dashboard.json`
      )).default,

      ...(await import(
        `../messages/${locale}/onboarding.json`
      )).default,
    },
  };
});
