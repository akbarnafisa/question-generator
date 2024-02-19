// Importing the inferRouterInputs and inferRouterOutputs types from the tRPC server library
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
// Importing the SuperJSON library for serializing JavaScript objects with complex data types
// the usage of SuperJSON is optional, you can use any other library that serializes JavaScript objects
// we need tp serialize the data to send it to the client because the client can't handle complex data types such as Date
import superjson from "superjson";

// Importing the type of the main router for the application
import { type AppRouter } from "~/server/api/root";

// Setting the transformer for the tRPC client to SuperJSON
export const transformer = superjson;

// This function returns the base URL for the tRPC API
// If the code is running in the browser, it returns an empty string
// If the code is running on Vercel, it returns the Vercel URL
// Otherwise, it returns the localhost URL with the PORT environment variable or 3000 as the port
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// This function returns the URL for the tRPC API
export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

// This type is a helper for inferring the inputs of the routes in the application's router
// It can be used to get the input type of a specific route
export type RouterInputs = inferRouterInputs<AppRouter>;

// This type is a helper for inferring the outputs of the routes in the application's router
// It can be used to get the output type of a specific route
export type RouterOutputs = inferRouterOutputs<AppRouter>;
