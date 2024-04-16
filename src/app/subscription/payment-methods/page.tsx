import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function BillingOverview() {
  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment method in your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <CardTitle>••••9163</CardTitle>
                <CardDescription>Expires 05/2024</CardDescription>
              </CardContent>

              <CardFooter>
                <div className="mr-4 text-sm font-semibold text-gray-500">
                  Default
                </div>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-4">
            {/* <div className="mb-2">No payment method has been added</div> */}
            <Button>Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
