import { getServerAuthSession } from "~/server/auth";
import QuestionPage from "./index";

export default async function Question({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  return (
    <>
      <QuestionPage session={session} questionId={params.id} />
    </>
  );
}
