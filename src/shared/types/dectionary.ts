export type ProfessionObject = {
	profession: string;
  imagePreview: string;
};

export type MainPageTranslations = {
  main_page: {
    professions_list: ProfessionObject[];
    login_panel: {
			[key: string]: string
		},
    reset_panel: {
			[key: string]: string
		},
    register_panel: {
			[key: string]: string
		}
  };
};