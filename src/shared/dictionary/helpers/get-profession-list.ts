import { getLangUser } from "@/shared/dictionary/actions/get/get-lang-user";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { getDictionary } from "./get-dictionary";

const getProfessionList = async () => {
  const { lang } = await getLangUser();

  const professionsList = (
    (await getDictionary(
      lang ? lang : "en",
    )) as unknown as MainPageTranslations
  ).main_page?.professions_list;

  return professionsList;
};

export { getProfessionList };
