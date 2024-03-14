import { rgbToHex } from '@/shared/helpers/color/rgb-to-hex'
import { Input } from '@/shared/ui/input'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { updateInlineStyles } from '@/shared/helpers/update-inline-styles'

type ColorToolProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function ColorTool({ currentElement }: ColorToolProps) {
	const inputSingleColorRef = useRef<HTMLInputElement>(null)

	const pathName = usePathname()

	const [color, setColor] = useState<string>(
		currentElement
			? rgbToHex(window.getComputedStyle(currentElement as HTMLElement).color)
			: '#ffffff'
	)

	// Функция для изменения цвета
	const onChangeColor = (color: string) => {
		if (currentElement) {
			setColor(color)
			;(currentElement as HTMLElement).style.setProperty('color', color)
		}
	}

	return (
		<button
			className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
			aria-label='Color'
		>
			<Input
				onChange={e => onChangeColor(e.target.value)}
				type='color'
				value={color}
				onBlur={() =>
					updateInlineStyles(currentElement as HTMLElement, pathName, 'color')
				}
				className='p-0 w-5 h-6 cursor-pointer border-none rounded-none'
				tabIndex={-1}
				ref={inputSingleColorRef}
			/>
		</button>
	)
}
