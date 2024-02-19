import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `question-generator_${name}`);

// Using the createTable function to define a 'post' table
export const posts = createTable(
  // The name of the table
  "post",
  // The columns of the table
  {
    // 'id' column, which is a primary key and auto-increments
    id: serial("id").primaryKey(),
    // 'name' column, which is a variable character string with a maximum length of 256
    name: varchar("name", { length: 256 }),
    // 'createdById' column, which is a foreign key referencing the 'id' column of the 'users' table
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    // 'createdAt' column, which is a timestamp that defaults to the current timestamp
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    // 'updatedAt' column, which is a timestamp
    updatedAt: timestamp("updatedAt"),
  },
  // The indexes of the table
  (post) => ({
    // An index on the 'createdById' column
    createdByIdIdx: index("createdById_idx").on(post.createdById),
    // An index on the 'name' column
    nameIndex: index("name_idx").on(post.name),
  })
);

// Using the createTable function to define a 'user' table
export const users = createTable(
  // The name of the table
  "user",
  // The columns of the table
  {
    // 'id' column, which is a variable character string with a maximum length of 255
    // This column is a primary key and cannot be null
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    // 'name' column, which is a variable character string with a maximum length of 255
    name: varchar("name", { length: 255 }),
    // 'email' column, which is a variable character string with a maximum length of 255
    // This column cannot be null
    email: varchar("email", { length: 255 }).notNull(),
    // 'emailVerified' column, which is a timestamp
    // The default value for this column is the current date and time
    emailVerified: timestamp("emailVerified", {
      mode: "date",
    }).default(sql`CURRENT_TIMESTAMP`),
    // 'image' column, which is a variable character string with a maximum length of 255
    image: varchar("image", { length: 255 }),
  }
);

// Defining the relations for the 'user' table
export const usersRelations = relations(users, ({ many }) => ({
  // Each user can have many accounts
  accounts: many(accounts),
}));

// Using the createTable function to define an 'account' table
export const accounts = createTable(
  // The name of the table
  "account",
  // The columns of the table
  {
    // 'userId' column, which is a variable character string with a maximum length of 255
    // This column is a foreign key referencing the 'id' column of the 'users' table and cannot be null
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    // 'type' column, which is a variable character string with a maximum length of 255
    // This column cannot be null and its type is defined by the 'type' property of the 'AdapterAccount' interface
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    // 'provider' column, which is a variable character string with a maximum length of 255
    // This column cannot be null
    provider: varchar("provider", { length: 255 }).notNull(),
    // 'providerAccountId' column, which is a variable character string with a maximum length of 255
    // This column cannot be null
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    // 'refresh_token' column, which is a text column
    refresh_token: text("refresh_token"),
    // 'access_token' column, which is a text column
    access_token: text("access_token"),
    // 'expires_at' column, which is an integer column
    expires_at: integer("expires_at"),
    // 'token_type' column, which is a variable character string with a maximum length of 255
    token_type: varchar("token_type", { length: 255 }),
    // 'scope' column, which is a variable character string with a maximum length of 255
    scope: varchar("scope", { length: 255 }),
    // 'id_token' column, which is a text column
    id_token: text("id_token"),
    // 'session_state' column, which is a variable character string with a maximum length of 255
    session_state: varchar("session_state", { length: 255 }),
  },
  // The indexes of the table
  (account) => ({
    // A compound primary key on the 'provider' and 'providerAccountId' columns
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    // An index on the 'userId' column
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

// Defining the relations for the 'account' table
export const accountsRelations = relations(accounts, ({ one }) => ({
  // Each account is associated with one user
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

// Using the createTable function to define a 'session' table
export const sessions = createTable(
  // The name of the table
  "session",
  // The columns of the table
  {
    // 'sessionToken' column, which is a variable character string with a maximum length of 255
    // This column is a primary key and cannot be null
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    // 'userId' column, which is a variable character string with a maximum length of 255
    // This column is a foreign key referencing the 'id' column of the 'users' table and cannot be null
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    // 'expires' column, which is a timestamp
    // This column cannot be null
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  // The indexes of the table
  (session) => ({
    // An index on the 'userId' column
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

// Defining the relations for the 'session' table
export const sessionsRelations = relations(sessions, ({ one }) => ({
  // Each session is associated with one user
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// Using the createTable function to define a 'verificationToken' table
export const verificationTokens = createTable(
  // The name of the table
  "verificationToken",
  // The columns of the table
  {
    // 'identifier' column, which is a variable character string with a maximum length of 255
    // This column cannot be null
    identifier: varchar("identifier", { length: 255 }).notNull(),
    // 'token' column, which is a variable character string with a maximum length of 255
    // This column cannot be null
    token: varchar("token", { length: 255 }).notNull(),
    // 'expires' column, which is a timestamp
    // This column cannot be null
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  // The indexes of the table
  (vt) => ({
    // A compound primary key on the 'identifier' and 'token' columns
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);