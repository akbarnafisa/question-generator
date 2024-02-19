// Importing server-only dependencies
import "server-only";

// Importing necessary modules from tRPC and Next.js
import {
  createTRPCProxyClient,
  loggerLink,
  TRPCClientError,
} from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { type TRPCErrorResponse } from "@trpc/server/rpc";
import { headers } from "next/headers";
import { cache } from "react";

// Importing application-specific modules
import { appRouter, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { transformer } from "./shared";

// This function creates the context required for the tRPC API when handling a tRPC call from a React Server Component.
// It sets a custom header 'x-trpc-source' to 'rsc' to indicate the source of the request.
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

// This creates a tRPC client proxy for the application's router.
// It includes a logger link for logging operations in development mode or when an error occurs.
// It also includes a custom link for invoking procedures directly without using HTTP requests, since Server Components always run on the server.
export const api = createTRPCProxyClient<AppRouter>({
  // The transformer is used to serialize and deserialize data
  transformer,
  // An array of links, which are middleware functions for the tRPC client
  links: [
    // The loggerLink logs operations. It's enabled in development mode or when an error occurs.
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    // This is a custom link that creates an observable.
    // The observable allows us to handle the procedure call in a reactive way.
    () =>
      ({ op }) =>
        observable((observer) => {
          // The context for the procedure call is created.
          createContext()
            .then((ctx) => {
              // The procedure is called with the necessary parameters.
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx,
                type: op.type,
              });
            })
            // If the procedure call is successful, the result is passed to the observer and the observable is completed.
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            // If an error occurs during the procedure call, it's passed to the observer as an error.
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});