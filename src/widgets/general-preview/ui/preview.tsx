"use client";

import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { Skeleton } from "@/shared/ui/skeleton";
import cn from "classnames";

type PreviewProps = {};

export function Preview({}: PreviewProps) {
  const { currentProfession, setCurrentProfession } =
    useCurrentProfessionStore();
  return (
    <div className="bottom-mask h-[415px] w-full md:h-[545px]">
      <Skeleton
        className={cn(
          "dark:second-gradient-dark second-gradient-white flex h-full w-full cursor-pointer items-center justify-center rounded-xl text-neutral-500 shadow-xl transition-all sm:text-[35px] md:text-[15px] lg:text-[20px] xl:text-[35px] 2xl:text-[40px]",
        )}
        onMouseOver={() => setCurrentProfession("Создать этот шаблон?")}
        onMouseLeave={() => setCurrentProfession("Pattern Landee")}
      >
        {currentProfession}
      </Skeleton>
    </div>
  );
}
