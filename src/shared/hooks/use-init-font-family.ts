import { useEffect } from 'react'
import { bykyvedeLight, jetBrainsMono, poppins } from '../fonts/shared-fonts'


export function useInitFontFamily(lang: string) {

	const removeExistingFontClass = (): void => {
		const existingFontClass = document.body.className
			.split(" ")
			.find((className) => className.startsWith("__className_"));

		if (existingFontClass) document.body.classList.remove(existingFontClass);
	}
	
  useEffect(() => {
    document.documentElement.lang = lang;
    removeExistingFontClass();

		switch (lang) {
			case "ua":
				document.body.classList.add(jetBrainsMono.className);
				break;
			case "ru":
				document.body.classList.add(jetBrainsMono.className);
				break;
			case "en":
				document.body.classList.add(jetBrainsMono.className);
				break;
			default:
				document.body.classList.add(jetBrainsMono.className);
		}
    
  }, [lang]);
}
