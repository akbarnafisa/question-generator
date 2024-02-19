// Importing the fetchRequestHandler from the tRPC server adapters
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// Importing the NextRequest type from the Next.js server
import { type NextRequest } from "next/server";

// Importing the environment variables
import { env } from "~/env";
// Importing the main router for the application
import { appRouter } from "~/server/api/root";
// Importing the function to create a new tRPC context
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This function creates a new tRPC context for each HTTP request.
 * It takes a Next.js request object as input and returns a tRPC context.
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

// This is the main request handler for the tRPC API.
// It uses the fetchRequestHandler from tRPC to handle HTTP requests.
// It takes a Next.js request object as input and returns a response.
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    // The endpoint for the tRPC API
    endpoint: "/api/trpc",
    // The Next.js request object
    req,
    // The main router for the application
    router: appRouter,
    // The function to create a new tRPC context for each request
    createContext: () => createContext(req),
    // An error handler that logs errors to the console in development mode
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

// Exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };