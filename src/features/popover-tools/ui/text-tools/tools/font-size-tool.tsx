import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'
import { FontSizeIcon } from '@radix-ui/react-icons'
import { Arrow } from '@radix-ui/react-popover'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { updateInlineStyles } from '../../../../../shared/helpers/update-inline-styles'

type FontSizeToolProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function FontSizeTool({ currentElement }: FontSizeToolProps) {
	const pathName = usePathname()

	// Получаем текущее значение font size
	const getCurrentNumberFromFontSize = (): number[] | undefined => {
		if (currentElement) {
			const fontSize = window.getComputedStyle(
				currentElement as HTMLElement
			).fontSize
			const a = fontSize.match(/\d+(?=px)/)
			const b = a ? a[0] : undefined
			return b ? [+b] : undefined
		}
		return undefined
	}

	const [text, setText] = useState<string>(
		getCurrentNumberFromFontSize()?.toString() || '0'
	)

	// Функция для изменения font size
	const onSetFontSize = (value: number[]) => {
		setText(value.toString())
		if (currentElement) {
			;(currentElement as HTMLElement).style.fontSize = `${value.toString()}px`
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Font Size'
				>
					<FontSizeIcon />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className='relative w-80 h-[50px] p-0 rounded-[25px] border-none'
				onBlur={() =>
					updateInlineStyles(
						currentElement as HTMLElement,
						pathName,
						'fontSize'
					)
				}
			>
				<Arrow width={10} height={5} />
				<div className='absolute top-0 w-[320px] z-20'>
					<span className='w-full absolute top-1/2 transform -translate-y-1/2 z-30 pointer-events-none text-slate-50 text-center text-stroke-05-black'>
						{' '}
						Text Font Size - <span>{text}px</span>
					</span>
					<Slider
						onValueChange={n => onSetFontSize(n)}
						defaultValue={getCurrentNumberFromFontSize()}
						min={5}
						max={120}
						step={1}
						className='[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px] [&>span:nth-child(2)>span]:h-[50px]'
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
