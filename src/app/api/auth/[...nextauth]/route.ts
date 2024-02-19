// Importing the NextAuth library for handling authentication in Next.js applications
import NextAuth from "next-auth";

// Importing the authentication options from the server's auth module
import { authOptions } from "~/server/auth";

// Creating a NextAuth handler with the imported authentication options
// The ESLint disable comment is used to ignore the TypeScript error about unsafe assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

// Exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };