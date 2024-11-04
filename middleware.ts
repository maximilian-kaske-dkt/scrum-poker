import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("uuid");
  const response = NextResponse.next();

  if (cookie) return response;

  // https://nextjs.org/docs/app/api-reference/edge#crypto-apis
  const uuid = crypto.randomUUID();
  response.cookies.set("uuid", uuid);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
