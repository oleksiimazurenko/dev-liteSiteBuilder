import { getProfessionList } from "@/shared/dictionary/helpers/get-profession-list";
import { Preview } from "@/widgets/main/preview";

export default async function Page() {
  const professionsList = await getProfessionList();
  return (
    <div className="flex min-h-[calc(100svh-59.5px)] min-w-[300px] items-center justify-center p-[20px]">
      <Preview className="container" professionsList={professionsList} />
    </div>
  );
}
