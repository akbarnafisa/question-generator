"use client";

import { type Session } from "next-auth";
import InputQuestion from "../_components/common/InputQuestion";
import { Button } from "~/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    title: "Science questions",
    content: "5 Science questions, 7th grade, focusing on human anatomy",
  },
  {
    title: "Geography questions",
    content: "2 Geography questions, 8th grade, about Asian countries",
  },
];

export default function Home({ session }: Props) {
  const [content, setContent] = useState<string>("");
  const router = useRouter();


  const handleSubmission = (prompt: string) => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }
    setContent(prompt);
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

        <InputQuestion content={content} onSubmit={handleSubmission} />

        <div className="mt-8">
          {TEMPLATE_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="mr-4"
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
