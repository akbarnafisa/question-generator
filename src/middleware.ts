export { default } from "next-auth/middleware"


export const config = { matcher: ["/question/:path*", "/question-list"] }