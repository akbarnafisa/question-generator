"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { type answers, type questions } from "~/server/db/schema";

interface Props {
  session: Session | null;
  questionId: string | null;
}

export default function QuestionPage({ questionId }: Props) {
  const { toast } = useToast();
  const [showSideBar, setShowSideBar] = useState(true);

  const {
    data: subjectQuestionsData,
    error,
    isError,
    isLoading,
  } = api.ai.getSubjectQuestions.useQuery(
    {
      id: Number(questionId) || 0,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Unable to get questions",
        description: error.message,
      });
    }
  }, [isError, error, toast]);

  return (
    <div
      className={cn(
        "question-page-height mt-14 grid h-screen w-full transition-all",
        showSideBar ? " md:grid-cols-[280px_1fr]" : " md:grid-cols-[72px_1fr]",
      )}
    >
      <div className="relative hidden border-r md:block">
        <div
          className={cn(
            "fixed flex h-full max-h-screen flex-col gap-2",
            showSideBar ? "w-[280px]" : "w-[72px]",
          )}
        >
          <nav className="mt-8 block items-start px-4 text-sm font-medium ">
            <div className="mb-4 flex items-center justify-between">
              <div className={cn(showSideBar ? "opacity-100" : "opacity-0")}>
                Questions
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4"
                onClick={() => setShowSideBar(() => !showSideBar)}
              >
                {showSideBar ? (
                  <ChevronsLeft size={16} />
                ) : (
                  <ChevronsRight size={16} />
                )}
              </Button>
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              subjectQuestionsData?.questions.map((item, index) => (
                <Link
                  className="mb-4 flex w-full items-center text-gray-500 hover:text-gray-900 "
                  key={item.id}
                  href={`#${item.id}`}
                >
                  <NumberQuestion number={index + 1} />
                  <div
                    className={cn(
                      "ml-2 overflow-hidden truncate",
                      "text-gray-900",
                    )}
                  >
                    {item.question}
                  </div>
                </Link>
              ))
            )}
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="fixed flex w-full items-center border-b bg-white px-4 py-6 shadow-sm lg:px-36">
          <h1 className="text-lg font-semibold md:text-xl">
            {subjectQuestionsData?.prompt ?? "Loading questions..."}
          </h1>
        </div>
        <main className="mt-16 flex flex-1 flex-col gap-4 bg-gray-100 px-4 py-12 md:gap-8 lg:px-36">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>
                {subjectQuestionsData?.questions.map((questionItem, index) => (
                  <MainQuestion
                    key={questionItem.id}
                    number={index + 1}
                    questionItem={questionItem}
                    questionType={subjectQuestionsData.question_type}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

const MultipleChoiseOptions: Record<number, string> = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
};

const MultipleChoiceAnswer = ({
  index,
  isCorrect,
  answer,
}: {
  index: number;
  isCorrect: boolean;
  answer: string;
}) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className={cn(
          "item-center flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 text-sm font-semibold",
          isCorrect && ["bg-green-100", "border-green-500", "text-green-500"],
        )}
      >
        <p>{MultipleChoiseOptions[index + 1]}</p>
      </div>
      <div>{answer}</div>
    </div>
  );
};

const ShortAnswerQuestion = ({ answer }: { answer: string }) => {
  return <>Jawaban Benar: {answer}</>;
};

type MainQuestionType = {
  number: number;
  questionType: string;
  questionItem: {
    answers: (typeof answers.$inferSelect)[];
  } & typeof questions.$inferSelect;
};

const MainQuestion = ({
  questionItem,
  number,
  questionType,
}: MainQuestionType) => {
  const questions = [
    {
      answer: "Communicating messages between the brain and body parts",
      isCorrect: true,
    },
    {
      answer: "Communicating messages between the brain and body parts",
      isCorrect: false,
    },
    {
      answer: "Communicating messages between the brain and body parts",
      isCorrect: false,
    },
    {
      answer: "Communicating messages between the brain and body parts",
      isCorrect: false,
    },
  ];

  return (
    <div className="mb-4 flex items-start rounded-lg border bg-white p-4 shadow-sm">
      <NumberQuestion number={number} />
      <div className="ml-4">
        <h3
          className="mb-4 text-lg font-semibold md:text-xl"
          id={`${questionItem.id}`}
          key={questionItem.id}
        >
          {questionItem.question}
        </h3>
        <div
          className={cn(
            questionType !== "short_answer" ? "min-h-[50px]" : "min-h-[200px]",
          )}
        >
          {questions.length === 1 ? (
            <ShortAnswerQuestion answer={questions[0]?.answer ?? ""} />
          ) : (
            <>
              {questions.map((answer, index) => (
                <MultipleChoiceAnswer
                  key={index}
                  index={index}
                  isCorrect={answer.isCorrect}
                  answer={answer.answer}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const NumberQuestion = ({ number }: { number: number }) => {
  return (
    <div
      className={cn(
        "flex min-h-[40px] min-w-[40px] items-center justify-center gap-3 rounded-lg transition-all",
        ["bg-gray-100", "border", "border-gray-200", "text-gray-900"],
      )}
    >
      {number}
    </div>
  );
};
