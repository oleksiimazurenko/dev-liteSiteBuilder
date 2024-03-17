import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { ExtendedUser } from "BASE_URL/next-auth";

type UserInfoProps = {
  user?: ExtendedUser;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Card className="w-[300px] border-none bg-transparent shadow-none md:w-[500px]">
      <CardContent className="space-y-4 p-0">
        <div className="flex flex-row items-center justify-between rounded-lg border-[0.5px] border-white p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <ScrollArea className="max-w-[180px] rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
            {user?.id}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border-[0.5px] border-white p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>

          <ScrollArea className="max-w-[180px] rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
            {user?.name}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border-[0.5px] border-white p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>

          <ScrollArea className="max-w-[180px] rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
            {user?.email}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border-[0.5px] border-white p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
