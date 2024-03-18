import { ScrollArea } from "@/shared/ui/scroll-area";
import cn from "classnames";

export default async function Page() {
  return (
    <ScrollArea className={cn("flex h-full items-center justify-center", {})}>
      <h1 className="text-center px-2 py-1 text-2xl text-black dark:text-white/70">Editor home page</h1>
    </ScrollArea>
  );
}
