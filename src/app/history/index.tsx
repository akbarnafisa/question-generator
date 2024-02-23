"use client";
import { Button } from "~/components/ui/button";
import { type Session } from "next-auth";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { useToast } from "~/components/ui/use-toast";
import Link from "next/link";

interface Props {
  session: Session | null;
}

export default function HistoryPage({ session }: Props) {
  const { toast } = useToast();

  const { data, error, isError, isLoading } =
    api.ai.getAllSubjectQuestions.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

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
    <div className="container mt-24">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Questions List</h1>
          <Button className="ml-auto" size="sm">
            <Link href="/">Add Question</Link>
          </Button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Questions Yet
                </h2>
                <p className="text-gray-500">
                  You haven't added any questions. Start by clicking the "Add
                  New Question" button.
                </p>
                <Button>
                  <Link href="/">Add New Question</Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Total Questions</TableHead>
                      <TableHead>Question Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Topic</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data?.map((question) => {
                      return (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-[400px] overflow-hidden truncate font-medium">
                            <Link href={`/question/${question.id}`} className="underline">
                              {question.prompt}
                            </Link>
                          </TableCell>
                          <TableCell>{question.total_questions}</TableCell>
                          <TableCell className="capitalize">
                            {question.question_type.replace("_", " ")}
                          </TableCell>
                          <TableCell>{question.subject}</TableCell>
                          <TableCell>{question.topic}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
