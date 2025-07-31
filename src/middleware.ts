// middleware.ts

import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth?.user?.email);

  // Закрытые пути
  // const closedPaths: string[] = [];

  const publicPath: string[] = ["/auth/login", "/auth/register", "/speed-test"];

  const isPublic = publicPath.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublic) {
    // Если пользователь не авторизован, делаем редирект на страницу аутентификации
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (isLoggedIn && isPublic) {
    // Если пользователь авторизован, и пытается попасть на страницу аутентификации, мы редиректим его на главную
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// Опционально: можно указать, для каких маршрутов middleware не будет выполняться
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
