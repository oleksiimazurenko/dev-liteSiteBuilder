import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";

export default async function Page() {
  return <ScrollArea className={cn("h-full", {})}>Home Page</ScrollArea>;
}
