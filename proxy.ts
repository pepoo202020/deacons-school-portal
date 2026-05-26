import createMiddleware from "next-intl/middleware";
import { routing } from "@/app/i18n/routing";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const intlMiddleware = createMiddleware(routing);

const { auth: authMiddleware } = NextAuth(authConfig);

const publicRoutes = ["/", "/login"];

export default authMiddleware((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicRoutes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  }
  if (!isLoggedIn) {
    const locale = pathname.split("/")[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validLocale = routing.locales.includes(locale as any)
      ? locale
      : routing.defaultLocale;

    const loginUrl = new URL(`/${validLocale}/login`, req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
