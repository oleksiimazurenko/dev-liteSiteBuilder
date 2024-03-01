export const hexToRgb = (hex: string): string => {
	// Убираем символ # из строки HEX, если он есть
	hex = hex.replace("#", "");

	// Разбиваем строку HEX на составляющие (r, g, b)
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);

	// Возвращаем строку в формате RGB
	return `rgb(${r}, ${g}, ${b})`;
};
