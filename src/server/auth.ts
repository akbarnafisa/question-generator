import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import { createTable, sessions } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      sessionId: string;
      name: string;
      image: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // The callbacks object defines functions that run during the authentication process
  callbacks: {
    // The session callback is used to manage user session data
    // It takes an object with the current session and user and returns the updated session
    // In this case, it's adding the user's id to the session object
    session: async ({ session, user }) => {
      const dbSession = await db.query.sessions.findFirst({
        where: eq(sessions.userId, user.id),
      });

      return {
        ...session,
        user: {
          sessionId: dbSession?.sessionToken,
          name: user.name,
          image: user.image,
        },
      };
    },
  },
  // The adapter is set to DrizzleAdapter, which is a database adapter for NextAuth.js
  // It's being passed the database connection object (db) and a function to create the database table (createTable)
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  // The providers array is used to specify the authentication providers for NextAuth.js
  // In this case, it's using Google as the authentication provider
  // The GoogleProvider is being passed the Google client ID and client secret from the environment variables
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
