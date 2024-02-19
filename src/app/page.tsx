import { getServerAuthSession } from "~/server/auth";
import Home from "./home";

export default async function Index() {
  const session = await getServerAuthSession();
  return (
    <>
      <Home session={session} />
    </>
  );
}
