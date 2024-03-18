import { CarouselProfessions } from "@/features/main/carousel-professions";
import { SlideForm } from "@/features/main/slide-form";
import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";
import { Preview } from "@/widgets/main/preview";

export default async function CreateSite() {
  const professionsList = await getProfessionList();

  return (
    <div className="relative col-span-2 m-auto flex min-h-[calc(100svh-59.5px)] w-full">
      <div className="absolute left-1/4 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform">
        <SlideForm professionsList={professionsList} />
      </div>
      <div className="container h-auto">
        <Preview className="h-full" professionsList={professionsList} />
      </div>
    </div>
  );
}

// prev. variant
{
  /* <div className="grid w-full grid-cols-[1fr] overflow-y-hidden md:grid-cols-[1fr,1fr]">
  <div className="m-auto flex h-full items-center justify-center p-2">
    <SlideForm professionsList={professionsList} />
  </div>

  <div className="vertical-mask grid h-full w-full grid-cols-[1fr,1fr]">
    <CarouselProfessions type="home" professionsList={professionsList} />
  </div>
</div>; */
}
