// middleware.ts

import { auth } from "@/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log('middleware auth @@@@@@@@@@@', req.auth)
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  // Пути, доступные без аутентификации
  const publicPaths = ["/login"];

  // Проверяем, является ли путь публичным
  const isPublicPath = publicPaths.includes(nextUrl.pathname);

  if (isPublicPath && isLoggedIn) {
    // Если пользователь авторизован и пытается получить доступ к публичному пути
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (!isPublicPath && !isLoggedIn) {
    // Если пользователь не авторизован и пытается получить доступ к защищенному пути
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

// Опционально: можно указать, для каких маршрутов middleware не будет выполняться
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
