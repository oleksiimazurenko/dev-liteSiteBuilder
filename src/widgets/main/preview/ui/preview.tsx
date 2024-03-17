"use client"

import { CarouselProfessions } from "@/features/main/carousel-professions";
import { useCurrentProfessionStore } from "@/shared/store/current-profession";
import { ProfessionObject } from "@/shared/types/dectionary";

type GeneralPreviewProps = {
  className?: string;
  professionsList: ProfessionObject[];
};

export function Preview({ className, professionsList }: GeneralPreviewProps) {
  const { currentProfession, setCurrentProfession } =
    useCurrentProfessionStore();

  return (
    <div className={`${className}`}>
      <div className="col-span-10 col-start-1 flex h-full min-h-[445px] flex-col justify-start overflow-hidden md:col-span-8 md:col-start-2 md:justify-center">
        <CarouselProfessions
          type="general-preview"
          professionsList={professionsList}
        />
      </div>
    </div>
  );
}
