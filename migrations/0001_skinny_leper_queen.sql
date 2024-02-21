CREATE TABLE IF NOT EXISTS "question-generator_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"questions_id" integer,
	"answer" varchar(255) NOT NULL,
	"isCorrect" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question-generator_subject_questions" (
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
DROP TABLE "question-generator_Results";--> statement-breakpoint
DROP TABLE "question-generator_post";--> statement-breakpoint
DROP TABLE "question-generator_Question";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP CONSTRAINT "question-generator_questions_author_id_question-generator_user_id_fk";
--> statement-breakpoint
ALTER TABLE "question-generator_questions" ADD COLUMN "question" text NOT NULL;--> statement-breakpoint
ALTER TABLE "question-generator_questions" ADD COLUMN "subject_questions_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_questions" ADD CONSTRAINT "question-generator_questions_subject_questions_id_question-generator_subject_questions_id_fk" FOREIGN KEY ("subject_questions_id") REFERENCES "question-generator_subject_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "grade";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "subject";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "topic";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "total_questions";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "question_type";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP COLUMN IF EXISTS "author_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_answers" ADD CONSTRAINT "question-generator_answers_questions_id_question-generator_questions_id_fk" FOREIGN KEY ("questions_id") REFERENCES "question-generator_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_subject_questions" ADD CONSTRAINT "question-generator_subject_questions_author_id_question-generator_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "question-generator_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
