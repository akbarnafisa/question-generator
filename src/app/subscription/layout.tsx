"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function SubscriptionPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const tabActive = useMemo(() => {
    return pathName.split("/")[2];
  }, [pathName]);

  return (
    <div className="mt-24 flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <h1 className="text-lg font-semibold md:text-2xl">
            Billing {tabActive}
          </h1>
          <Tabs defaultValue={tabActive}>
            <div className="flex items-center">
              <TabsList>
                <Link href="/subscription/overview">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                </Link>

                <Link href="/subscription/payment-methods">
                  <TabsTrigger value="payment-methods">
                    Payment Methods
                  </TabsTrigger>
                </Link>

                <Link href="/subscription/history">
                  <TabsTrigger value="history">Billing History</TabsTrigger>
                </Link>
              </TabsList>
            </div>
            <div className="mt-4">{children}</div>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
