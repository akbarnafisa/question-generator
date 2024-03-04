import { relations, sql } from "drizzle-orm";
import {
  boolean,
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
export const createTable = pgTableCreator(
  (name) => `question-generator_${name}`,
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
    token: integer("token").default(30),
  },
);

// Defining the relations for the 'user' table
export const usersRelations = relations(users, ({ many }) => ({
  // Each user can have many accounts
  accounts: many(accounts),
  subjectQuestions: many(subjectQuestions),
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
  }),
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
  }),
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
  }),
);

export const subjectQuestions = createTable("subject_questions", {
  id: serial("id").primaryKey(),
  prompt: varchar("prompt", { length: 500 }).notNull(),
  grade: varchar("grade", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  totalQuestions: integer("total_questions").notNull(),
  questionType: varchar("question_type", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  authorId: varchar("author_id", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const subjectQuestionsRelations = relations(
  subjectQuestions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [subjectQuestions.authorId],
      references: [users.id],
    }),
    questions: many(questions),
  }),
);

export const questions = createTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  subjectQuestionsId: integer("subject_questions_id")
    .references(() => subjectQuestions.id, { onDelete: "cascade" })
    .notNull(),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  subjectQuestion: one(subjectQuestions, {
    fields: [questions.subjectQuestionsId],
    references: [subjectQuestions.id],
  }),
  answers: many(answers),
}));

export const answers = createTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("questions_id")
    .references(() => questions.id, { onDelete: "cascade" })
    .notNull(),
  answer: varchar("answer", { length: 255 }).notNull(),
  isCorrect: boolean("isCorrect").notNull(),
});

export const answersRelations = relations(answers, ({ one }) => ({
  subjectQuestion: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));
