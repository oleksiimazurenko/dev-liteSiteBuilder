import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { ExtendedUser } from "BASE_URL/next-auth";
import cn from "classnames";

type UserInfoProps = {
  user?: ExtendedUser;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card className="flex w-[300px] justify-center border-none bg-transparent shadow-none md:w-full">
      <CardContent className="w-full space-y-4 p-0">
        <div className="bg-glass flex flex-row items-center justify-between rounded-md p-3">
          <p className="text-primary text-sm">ID</p>
          <ScrollArea className="text-primary max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs">
            {user?.id}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="bg-glass flex flex-row items-center justify-between rounded-md p-3">
          <p className="text-primary text-sm">Name</p>

          <ScrollArea className="text-foreground text-primary max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs">
            {user?.name}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="bg-glass flex flex-row items-center justify-between rounded-md p-3">
          <p className="text-primary text-sm">Email</p>

          <ScrollArea className="text-foreground text-primary max-w-[180px] rounded-sm px-[10px] py-[2px] text-center font-mono text-xs">
            {user?.email}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="bg-glass flex flex-row items-center justify-between rounded-md p-3">
          <p className="text-primary text-sm">Two Factor Authentication</p>
          <Badge
            className={cn("", {
              ["bg-green-400/50"]: user?.isTwoFactorEnabled,
              ["bg-red-400/50"]: !user?.isTwoFactorEnabled,
            })}
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
