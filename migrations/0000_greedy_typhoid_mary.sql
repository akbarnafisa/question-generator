CREATE TABLE IF NOT EXISTS "question-generator_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "question-generator_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_Results" (
	"id" serial PRIMARY KEY NOT NULL,
	"questions_id" integer,
	"answer" varchar(255) NOT NULL,
	"isCorrect" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdById" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_Question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"subject_questions_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"total_questions" integer NOT NULL,
	"question_type" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	"author_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "question-generator_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "question-generator_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "question-generator_post" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "question-generator_post" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "question-generator_session" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_account" ADD CONSTRAINT "question-generator_account_userId_question-generator_user_id_fk" FOREIGN KEY ("userId") REFERENCES "question-generator_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_Results" ADD CONSTRAINT "question-generator_Results_questions_id_question-generator_Question_id_fk" FOREIGN KEY ("questions_id") REFERENCES "question-generator_Question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_post" ADD CONSTRAINT "question-generator_post_createdById_question-generator_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "question-generator_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_Question" ADD CONSTRAINT "question-generator_Question_subject_questions_id_question-generator_questions_id_fk" FOREIGN KEY ("subject_questions_id") REFERENCES "question-generator_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_session" ADD CONSTRAINT "question-generator_session_userId_question-generator_user_id_fk" FOREIGN KEY ("userId") REFERENCES "question-generator_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_questions" ADD CONSTRAINT "question-generator_questions_author_id_question-generator_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "question-generator_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
