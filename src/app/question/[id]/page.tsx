import { getServerAuthSession } from "~/server/auth";
import QuestionPage from "./index";
import { type Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Questions Page - Quiz question generator tool',
}

export default async function Question({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  return (
    <>
      <QuestionPage session={session} questionId={params.id} />
    </>
  );
}
