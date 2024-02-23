ALTER TABLE "question-generator_answers" ALTER COLUMN "questions_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question-generator_questions" ALTER COLUMN "subject_questions_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "question-generator_subject_questions" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "question-generator_subject_questions" ALTER COLUMN "updated_at" SET NOT NULL;