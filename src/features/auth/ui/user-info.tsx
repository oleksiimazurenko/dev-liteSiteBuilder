import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { ExtendedUser } from "BASE_URL/next-auth";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <ScrollArea>
      <Card className="h-full border-none bg-transparent shadow-none">
        <CardHeader>
          <p className="text-center text-2xl font-semibold">{label}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border-white border-[0.5px] p-3 shadow-sm">
            <p className="text-sm font-medium">ID</p>
            <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
              {user?.id}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between border-white border-[0.5px] rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium">Name</p>
            <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
              {user?.name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border-white border-[0.5px] p-3 shadow-sm">
            <p className="text-sm font-medium">Email</p>
            <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
              {user?.email}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border-white border-[0.5px] p-3 shadow-sm">
            <p className="text-sm font-medium">Role</p>
            <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs dark:text-black">
              {user?.role}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border-white border-[0.5px] p-3 shadow-sm">
            <p className="text-sm font-medium">Two Factor Authentication</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "default" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};
