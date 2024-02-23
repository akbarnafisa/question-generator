"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { type answers, type questions } from "~/server/db/schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
  } = api.ai.getSubjectQuestionsWithQuestions.useQuery(
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
        "question-page-height mt-12 flex h-screen w-full transition-all",
        // showSideBar ? " md:grid-cols-[280px_1fr]" : " md:grid-cols-[72px_1fr]",
      )}
    >
      <div className="relative hidden border-r lg:block">
        <div
          className={cn(
            " z-10  flex flex-col gap-2",
            showSideBar ? "w-[280px]" : "w-[72px]",
          )}
        >
          <nav className="block items-start text-sm font-medium ">
            <div className="mb-8 flex items-center justify-between border-b px-4 py-7">
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
                <TooltipProvider key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="mb-4 flex w-full items-center px-4 text-gray-500 hover:text-gray-900"
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.question}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            )}
          </nav>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center border-b bg-white px-4 py-6 shadow-sm  w-full">
          <div className="mx-auto max-w-2xl  w-full">
            <h1 className="text-lg font-semibold truncate md:text-xl">
              {subjectQuestionsData?.prompt ?? "Loading questions..."}
            </h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 bg-gray-100 md:gap-8 question-page-content-height">
          <div className="mx-auto max-w-3xl px-4 pt-10 pb-28">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {subjectQuestionsData?.questions.map((questionItem, index) => (
                  <MainQuestion
                    key={questionItem.id}
                    number={index + 1}
                    questionItem={questionItem}
                    questionType={subjectQuestionsData.question_type}
                  />
                ))}
              </>
            )}
          </div>
        </div>
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
          "item-center flex min-h-[28px] min-w-[28px] items-center justify-center rounded-full border-2 text-sm font-semibold",
          isCorrect && ["bg-green-100", "border-green-500", "text-green-500"],
        )}
      >
        {MultipleChoiseOptions[index + 1]}
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
      answer:
        "Communicating messages between the brain and body parts",
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
    <div className="mb-4 flex flex-col rounded-lg border bg-white p-4 shadow-sm">
      <h3
        className="mb-4 flex items-center font-semibold after:text-lg md:text-xl"
        id={`${questionItem.id}`}
        key={questionItem.id}
      >
        {number}. {questionItem.question}
      </h3>
      <div
        className={cn(
          "text-sm md:text-base",
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
