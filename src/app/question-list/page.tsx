import HistoryPage from "./index";
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Questions List - Quiz question generator tool',
}

export default async function History() {
  return (
    <>
      <HistoryPage />
    </>
  );
}
