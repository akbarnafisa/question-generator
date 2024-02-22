import { getServerAuthSession } from "~/server/auth";
import HistoryPage from "./index";

export default async function History() {
  const session = await getServerAuthSession();
  return (
    <>
      <HistoryPage session={session} />
    </>
  );
}
