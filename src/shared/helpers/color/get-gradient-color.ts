import { rgbToHex } from './rgb-to-hex'

export const getGradientColor = (
	currentElement: Element | null | undefined
): string[] => {
	if (!currentElement) return ['', '']
	const backgroundStyle = window.getComputedStyle(currentElement).background
	const gradientColorPattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g
	let match
	const colors = []

	while ((match = gradientColorPattern.exec(backgroundStyle)) !== null) {
		colors.push(rgbToHex(match[0]))
	}

	if (colors.length === 0) {
		return ['#000000', '#000000'] // Замените на желаемый цвет по умолчанию
	}

	return colors
}
