import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function BillingOverview() {
  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
          <CardDescription>
            Manage your billing information, view past invoices, and track your
            spending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <strong>Current Plan:</strong> Regular{" "}
          </div>
          <div className="text-sm">
            <strong>Next Billing Date:</strong> -
          </div>
          <div className="text-sm">
            <strong>Price per-month:</strong> $0
          </div>
          <div>
            <Button className="mt-8">Upgrade</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Buy Tokens</CardTitle>
          <CardDescription>
            You can directly buy tokens without a subscription. Choose from the
            options below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="grid gap-2 px-3 py-4 text-center">
              <CardTitle>100 Tokens</CardTitle>
              <CardDescription className="font-bold">$1</CardDescription>
              <Button>Buy</Button>
            </Card>

            <Card className="grid gap-2 px-3 py-4 text-center">
              <CardTitle>200 Tokens</CardTitle>
              <CardDescription className="font-bold">$5</CardDescription>
              <Button>Buy</Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
