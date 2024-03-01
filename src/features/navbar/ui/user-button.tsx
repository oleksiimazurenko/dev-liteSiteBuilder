"use client";

import { logout } from "@/shared/lib/auth/actions/set/logout";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="mr-2 hover:scale-105 border border-slate-900">
          <AvatarImage
            src={user?.image ? user.image : "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem
          onClick={() => router.push("/settings", { scroll: false })}
        >
          <UserRoundCog className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
