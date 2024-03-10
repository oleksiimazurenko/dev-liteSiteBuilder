import { CarouselProfessions } from "@/features/carousel-professions";
import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";
import { Preview } from "./preview";

type GeneralPreviewProps = {
  className?: string;
};

export async function GeneralPreview({ className }: GeneralPreviewProps) {
  const professionsList = await getProfessionList();

  return (
    <div className={`${className}`}>
      <div className="col-span-10 col-start-1 flex h-full min-h-[445px] flex-col justify-start overflow-hidden md:col-span-8 md:col-start-2 md:justify-center">
        <Preview />
        <div className="mt-[10px] space-y-1">
          <CarouselProfessions
            type="general-preview"
            professionsList={professionsList}
          />
        </div>
      </div>
    </div>
  );
}
