"use client";
import { changeRole } from "@/shared/lib/auth/actions/set/change-role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type InputRoleProps = {
  currentRole: string;
};

export function InputRole({ currentRole: role }: InputRoleProps) {
  return (
    <Select onValueChange={changeRole}>
      <SelectTrigger className="leading-0 max-w-[180px] rounded-md bg-slate-200 p-0 px-[10px] py-[13px] text-center font-mono text-xs first:mr-2">
        <SelectValue placeholder={role} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">ADMIN</SelectItem>
        <SelectItem value="USER">USER</SelectItem>
      </SelectContent>
    </Select>
  );
}
