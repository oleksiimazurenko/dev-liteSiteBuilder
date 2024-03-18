import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";
import { Preview } from "@/widgets/main/preview";

export default async function Page() {
  const professionsList = await getProfessionList();
  return (
    <div className="relative grid min-h-[calc(100svh-59.5px)] min-w-[300px] items-baseline justify-center p-[20px]">
      <div className="container h-full">
        <Preview className="h-full" professionsList={professionsList} />
      </div>
    </div>
  );
}
