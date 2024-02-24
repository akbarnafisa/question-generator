import { getServerAuthSession } from "~/server/auth";
import HistoryPage from "./index";
import { type Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Questions List - Quiz question generator tool',
}

export default async function History() {
  const session = await getServerAuthSession();
  return (
    <>
      <HistoryPage session={session} />
    </>
  );
}
