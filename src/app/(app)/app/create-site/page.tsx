import { CarouselProfessions } from "@/features/carousel-professions";
import { SlideForm } from "@/features/slide-form";
import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";

export default async function CreateSite() {
  const professionsList = await getProfessionList();

  return (
    <div className="grid h-full w-full grid-cols-[1fr,1fr] overflow-y-scroll">
      <div className="m-auto flex h-full items-center justify-center p-2">
        <SlideForm professionsList={professionsList} />
      </div>

      <div className="vertical-mask grid h-full w-full grid-cols-[1fr,1fr]">
        <CarouselProfessions
          type="list-sites"
          professionsList={professionsList}
        />
      </div>
    </div>
  );
}
