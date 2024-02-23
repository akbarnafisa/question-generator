ALTER TABLE "question-generator_answers" DROP CONSTRAINT "question-generator_answers_questions_id_question-generator_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "question-generator_questions" DROP CONSTRAINT "question-generator_questions_subject_questions_id_question-generator_subject_questions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_answers" ADD CONSTRAINT "question-generator_answers_questions_id_question-generator_questions_id_fk" FOREIGN KEY ("questions_id") REFERENCES "question-generator_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question-generator_questions" ADD CONSTRAINT "question-generator_questions_subject_questions_id_question-generator_subject_questions_id_fk" FOREIGN KEY ("subject_questions_id") REFERENCES "question-generator_subject_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
