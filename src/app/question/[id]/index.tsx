"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Session } from "next-auth";

const data = {
  grade: "2nd grade high school",
  subject: "Mathematics",
  topic: "Algebra",
  total_questions: 4,
  question_type: "short_answer",
  questions: [
    "What is the missing number in the equation 3 + __ = 8?",
    "If x = 4, what is the value of x + 2?",
    "What is the value of x when x + 5 = 10?",
    "How many variables are in the equation 2x + 3 = 9?",
  ],
};

interface Props {
  session: Session | null;
  questionId: string | null;
}

export default function QuestionPage({ session, questionId }: Props) {
  const linkActive = useMemo(() => 0, []);
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <div
      className={cn(
        "mt-12 grid h-screen w-full transition-all",
        showSideBar ? " md:grid-cols-[280px_1fr]" : " md:grid-cols-[72px_1fr]",
      )}
    >
      <div className="relative hidden border-r  bg-gray-100/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
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
            {data.questions.map((question, index) => (
              <Link
                className="mb-2 flex w-full items-center text-gray-500 hover:text-gray-900 "
                key={index}
                href="#"
              >
                <div
                  className={cn(
                    "flex  min-h-[40px] min-w-[40px] items-center justify-center gap-3 rounded-lg  transition-all",
                    linkActive === index && [
                      "bg-gray-100",
                      "border",
                      "border-gray-200",
                      "text-gray-900",
                    ],
                  )}
                >
                  {index + 1}
                </div>
                <div
                  className={cn(
                    "ml-2 overflow-hidden truncate",
                    linkActive === index && "text-gray-900",
                  )}
                >
                  {question}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Products My Post: {questionId}
            </h1>
            <Button className="ml-auto" size="sm">
              Add product
            </Button>
          </div>
          <div className="rounded-lg border shadow-sm">123</div>
        </main>
      </div>
    </div>
  );
}
