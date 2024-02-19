// Importing the drizzle function from the 'drizzle-orm/neon-http' package
// Drizzle is a lightweight ORM (Object-Relational Mapping) for TypeScript
import { drizzle } from 'drizzle-orm/neon-http';

// Importing the neon function from the '@neondatabase/serverless' package
// Neon is a serverless database connector
import { neon } from '@neondatabase/serverless';

// Importing the environment variables from the '~/env.js' file
import { env } from "~/env.js";

// Importing the database schema from the './schema' file
import * as schema from "./schema";

// Creating a drizzle instance with the neon database connector and the database schema
// The neon function is called with the database URL from the environment variables
export const db = drizzle(neon(env.DATABASE_URL), { schema });