import { z } from "zod";
import OpenAI from "openai";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { questions, sessions, subjectQuestions } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { unescape } from 'html-escaper';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_QUESTIONS = 10;

type ExtractQuestions = {
  grade: string;
  subject: string;
  topic: string;
  total_questions: number;
  question_type: string;
};

type ExtractQuestionsError = {
  error: string;
};



export const aiRouter = createTRPCRouter({
  generateSubjectQuestions: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prompt } = input;

      const sessionId = ctx.session.user.sessionId; // how to get session id

      const user = await ctx.db.query.sessions.findFirst({
        where: eq(sessions.sessionToken, sessionId),
        with: { user: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const extractText = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        stream: false,
        temperature: 0,
        max_tokens: 300,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        prompt: createExtractQuestionsPrompt(prompt),
      });

      const extractResult = extractQuestionsFromGPT(
        extractText.choices[0]?.text ?? "{}",
      );

      if ("error" in extractResult) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Ensure questions are properly formatted and try again.",
        });
      }

      const { grade, subject, topic, total_questions, question_type } =
        extractResult;

      if (total_questions > MAX_QUESTIONS) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: `Total questions should not exceed ${MAX_QUESTIONS}`,
        });
      }

      // Respond with the stream
      const generateQuiz = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        stream: false,
        temperature: 0.5,
        max_tokens: 1000,
        prompt: createQuestionsPrompt({
          grade,
          subject,
          topic,
          total_questions,
          question_type,
        }),
      });

      const quizResult = generateQuiz.choices[0]?.text ?? "";
      let quizResultArray: string[] = [];

      try {
        quizResultArray = quizResult
          .split("_END_")
          .filter(Boolean)
          .map((v) => v.replaceAll("\n", "").replaceAll("Q:", "").trim());
      } catch (error) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message:
            "Unable to create questions, please ensure questions are properly formatted and try again.",
        });
      }

      const [subjectQuestionsDb] = await ctx.db
        .insert(subjectQuestions)
        .values({
          grade: grade,
          subject: subject,
          topic: topic,
          totalQuestions: total_questions,
          questionType: question_type,
          authorId: user.userId,
        })
        .returning();

      if (!subjectQuestionsDb) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to insert subject questions",
        });
      }

      for (const item of quizResultArray) {
        await ctx.db.insert(questions).values({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          question: unescape(item),
          subjectQuestionsId: subjectQuestionsDb.id,
        });
      }

      const result = await ctx.db.query.subjectQuestions.findFirst({
        where: eq(subjectQuestions.id, subjectQuestionsDb.id),
        with: {
          questions: true,
        },
      });

      return {
        id: result?.id,
      };
    }),
});

const extractQuestionsFromGPT = (
  text: string,
): ExtractQuestions | ExtractQuestionsError => {
  try {
    const {
      grade = "general",
      subject = "general",
      topic = "general",
      total_questions = 5,
      question_type = "short_answer",
    } = JSON.parse(text ?? "{}") as unknown as ExtractQuestions;

    return {
      total_questions: total_questions || 5,
      grade: grade || "general",
      subject: subject || "general",
      topic: topic || "general",
      question_type: question_type || "short_answer",
    };
  } catch (error) {
    return {
      error:
        "Failed to extract questions, please try again with different questions",
    };
  }
};

const createExtractQuestionsPrompt = (prompt: string) => {
  return `Extract the following from the text, If not found, set to null: - total_questions: the total number of questions. - subject: the subject of the questions. - topic: the topic of the questions. - grade: the grade level of the questions. - question_type: Determines question type. Use "short_answer", "multiple_choice". Return the result in JSON. Example:{"total_questions": 5,"subject": "Mathematics","topic": "Algebra","grade": "7th grade",: "short_answer",} Information:${prompt}`;
};

const createQuestionsPrompt = (data: ExtractQuestions) => {
  return `
    Create ${data.total_questions} in ${data.question_type.replace("_", "")} format questions for ${data.grade} ${data.subject} on ${data.topic}.
    The result must follow the following rules:
    - do not give the option or the answer
    - format the questions in plain text
    - begin each question with "Q:" to denote the question
    - end each question with "_END_"
  `;
};
