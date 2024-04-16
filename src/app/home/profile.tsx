"use client";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";
export function Profile() {
  const { data } = api.ai.getUser.useQuery(undefined, {

    refetchOnWindowFocus: false,
  });

  data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <User size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href={"/subscription"} className="w-full">
          <DropdownMenuItem className="flex justify-between cursor-pointer">
            <div>Token</div>
            <div className="font-medium">{data?.token}</div>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/question-list"} className="w-full">
            <DropdownMenuItem className="cursor-pointer">
              Questions List
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={"/api/auth/signout"} className="w-full">
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
