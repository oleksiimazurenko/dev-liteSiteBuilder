export const rgbToHex = (rgb: string): string => {
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	let rgbParts = rgb.slice(4).split(")")[0].split(sep);

	let r = (+rgbParts[0]).toString(16),
			g = (+rgbParts[1]).toString(16),
			b = (+rgbParts[2]).toString(16);

	if (r.length == 1)
			r = "0" + r;
	if (g.length == 1)
			g = "0" + g;
	if (b.length == 1)
			b = "0" + b;

	return "#" + r + g + b;
}