import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/employee-dashboard")) {
      if (token?.type !== "employee") {
        return NextResponse.redirect(new URL("/employee-login", req.url));
      }
      
      // Restrict employee management to SUPER_ADMIN and MANAGER
      if (path.startsWith("/employee-dashboard/employees") && token.role === "EMPLOYEE") {
        return NextResponse.redirect(new URL("/employee-dashboard", req.url));
      }
    }

    if (path.startsWith("/member-dashboard")) {
      if (token?.type !== "member") {
        return NextResponse.redirect(new URL("/member-login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/employee-dashboard/:path*", "/member-dashboard/:path*"],
};
