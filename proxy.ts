import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18n>[0]) {
  return handleI18n(request);
}

export const config = {
  matcher: [
    // Match everything except Next.js internals, static files, and API routes
    "/((?!langora/api|_next|_vercel|.*\\..*).*)",
  ],
};
