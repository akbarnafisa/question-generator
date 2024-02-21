"use client";

import { type Session } from "next-auth";
import InputQuestion from "../_components/common/InputQuestion";
import { Button } from "~/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import { useToast } from "~/components/ui/use-toast";

interface Props {
  session: Session | null;
}

const TEMPLATE_QUESTIONS = [
  {
    title: "Mathematics questions",
    content:
      "4 Mathematics questions, 2nd grade high school, with algebra topics",
  },
  {
    title: "Multiple Choice Questions",
    content:
      "5 multiple choice questions on the topic of human anatomy, suitable for 7th-grade Science.",
  },
  {
    title: "Geography questions",
    content: "2 Geography questions, 8th grade, about Asian countries",
  },
];

type QUESTIONS = {
  grade: string;
  subject: string;
  topic: string;
  total_questions: number;
  question_type: string;
  questions: string[];
};

export default function Home({ session }: Props) {
  const [content, setContent] = useState<string>("");
  const [questions, setQuestions] = useState<QUESTIONS | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const { complete, isLoading } = useCompletion({
    api: `/api/questions?sessionId=${session?.user.sessionId ?? ""}`,
    onFinish(_, completion) {
      const result = JSON.parse(completion) as QUESTIONS;
      setQuestions(result);
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "Unable to generate questions",
        description: error.message,
      });
    },
  });

  const handleSubmission = async (prompt: string) => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    if (prompt) {
      setContent(prompt);
      await complete(prompt);
    }
  };

  const handleTemplateSelection = (index: number) => {
    setContent(TEMPLATE_QUESTIONS[index]?.content ?? "");
  };

  return (
    <div className="container">
      <div className="my-12 flex flex-col items-center justify-center py-[26vh]">
        <h2 className="mb-2 text-3xl font-bold tracking-tighter md:text-4xl/tight">
          AI-Powered Quiz Generator
        </h2>
        <p className="mb-8">
          Elevate your study sessions with quick, curriculum-aligned quizzes
          crafted by our AI.
        </p>

        <InputQuestion
          isLoading={isLoading}
          content={content}
          onSubmit={handleSubmission}
          onChange={(e) => setContent(e)}
        />

        <div className="mt-8">
          {TEMPLATE_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="mb-4 mr-2"
              onClick={() => handleTemplateSelection(index)}
            >
              {question.title} <ArrowUpRight className="ml-1" size={18} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
