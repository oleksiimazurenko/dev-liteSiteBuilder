import { getLangUser } from "@/shared/actions/user/get-lang-user";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { getDictionary } from "./get-dictionary";

const getProfessionList = async () => {

  const { data: userLang } = await getLangUser();

  const professionsList = (
    (await getDictionary(
      userLang ? userLang : "en",
    )) as unknown as MainPageTranslations
  ).main_page?.professions_list;

  return professionsList;
};

export { getProfessionList };
