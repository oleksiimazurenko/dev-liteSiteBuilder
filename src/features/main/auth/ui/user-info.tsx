import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { ExtendedUser } from "BASE_URL/next-auth";

type UserInfoProps = {
  user?: ExtendedUser;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card className="flex w-[300px] justify-center border-none bg-transparent shadow-none md:w-full">
      <CardContent className="w-full space-y-4 p-0">
        <div className="flex flex-row items-center justify-between rounded-md bg-background/95 p-3 supports-[backdrop-filter]:bg-background/10">
          <p className="text-sm font-[200] text-neutral-500 transition-all dark:text-neutral-400">
            ID
          </p>
          <ScrollArea className="max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs font-[200] text-foreground text-neutral-500 transition-all dark:text-neutral-400">
            {user?.id}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-md bg-background/95 p-3 supports-[backdrop-filter]:bg-background/10">
          <p className="text-sm font-[200] text-neutral-500 transition-all dark:text-neutral-400">
            Name
          </p>

          <ScrollArea className="max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs font-[200] text-foreground text-neutral-500 transition-all dark:text-neutral-400">
            {user?.name}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-md bg-background/95 p-3 supports-[backdrop-filter]:bg-background/10">
          <p className="text-sm font-[200] text-neutral-500 transition-all dark:text-neutral-400">
            Email
          </p>

          <ScrollArea className="max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs font-[200] text-foreground text-neutral-500 transition-all dark:text-neutral-400">
            {user?.email}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-md bg-background/95 p-3 supports-[backdrop-filter]:bg-background/10">
          <p className="text-sm font-[200] text-neutral-500 transition-all dark:text-neutral-400">
            Two Factor Authentication
          </p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
