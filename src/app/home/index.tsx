"use client";

import { type Session } from "next-auth";
import InputQuestion from "../_components/common/InputQuestion";
import { Button } from "~/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";

import { api } from "~/trpc/react";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

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
    content: "2 Geography short answer questions, 8th grade, about Asian countries",
  },
];

export default function Home({ session }: Props) {
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  const { isLoading, mutate } = api.ai.createSubjectQuestions.useMutation({
    onSuccess: (data) => {
      router.push(`/question/${data.id}`);
    },
    onError: (error) => {
      if ((error.message as TRPC_ERROR_CODE_KEY) === "UNAUTHORIZED") {
        router.push("/api/auth/signin");
      } else {
        toast({
          variant: "destructive",
          title: "Unable to generate questions",
          description: error.message,
        });
      }
    },
  });

  const handleSubmission = async (prompt: string) => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    if (prompt) {
      mutate({ prompt });
    }
  };

  const handleTemplateSelection = (index: number) => {
    setContent(TEMPLATE_QUESTIONS[index]?.content ?? "");
  };

  return (
    <div className="container">
      <div className="my-12 flex flex-col items-center justify-center py-[26vh]">
        <h2 className="mb-2 text-3xl font-bold tracking-tighter md:text-4xl/tight">
          AI-Powered Question Generator
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
