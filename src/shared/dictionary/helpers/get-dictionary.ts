type Lang = {
  [key: string]: string | Lang;
};

const getDictionary = async (locale: string): Promise<Lang> => {
  try {
    const dictionary = await import(`../${locale}.json`).then(
      (module) => module.default,
    );
    return dictionary;
  } catch (error) {
    console.error(`Localization file for ${locale} not found.`);
    return {};
  }
};

export { getDictionary };