import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.KONEX_ADMIN_USER;
  const password = process.env.KONEX_ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse("Panel admin no configurado.", { status: 503 });
  }

  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    const decoded = encoded ? atob(encoded) : "";
    const [providedUser, providedPassword] = decoded.split(":");

    if (scheme === "Basic" && providedUser === user && providedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Konex360 Admin"'
    }
  });
}

export const config = {
  matcher: ["/admin/:path*"]
};
