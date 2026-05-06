import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  
  if (!session && request.nextUrl.pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = { matcher: ["/chat/:path*"] };
