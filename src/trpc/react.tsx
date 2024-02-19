"use client";

// Importing the QueryClient and QueryClientProvider from the React Query library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Importing the loggerLink and unstable_httpBatchStreamLink from the tRPC client library
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
// Importing the createTRPCReact function from the tRPC React Query library
import { createTRPCReact } from "@trpc/react-query";
// Importing the useState hook from React for state management
import { useState } from "react";

// Importing the type of the main router for the application
import { type AppRouter } from "~/server/api/root";
// Importing the getUrl function and the transformer object from the shared module
import { getUrl, transformer } from "./shared";

// Creating a new tRPC client for the application
export const api = createTRPCReact<AppRouter>();

// This is a React component that provides a tRPC context to all components in the application
export function TRPCReactProvider(props: { children: React.ReactNode }) {
  // Using the useState hook to create a new QueryClient
  const [queryClient] = useState(() => new QueryClient());

  // Using the useState hook to create a new tRPC client
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        // The loggerLink logs all operations in development mode or when an operation results in an error
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        // The unstable_httpBatchStreamLink sends all operations to the tRPC API
        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),
      ],
    })
  );

  // The component returns a QueryClientProvider that wraps an api.Provider
  // The api.Provider provides the tRPC client and the QueryClient to all components in the application
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}