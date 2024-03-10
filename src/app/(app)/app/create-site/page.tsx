import { SlideForm } from "@/features/slide-form";
import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";

export default async function CreateSite() {
  const professionsList = await getProfessionList();

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center p-2">
      <SlideForm professionsList={professionsList} />
    </div>
  );
}
