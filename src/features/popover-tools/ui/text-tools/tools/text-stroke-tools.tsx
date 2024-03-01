'use client'

import { rgbToHex } from '@/shared/helpers/color/rgb-to-hex'
import { Input } from '@/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'
import { Arrow } from '@radix-ui/react-popover'
import { PenTool } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { updateInlineStyles } from '../../../../../shared/helpers/update-inline-styles'

type TextStrokeToolsProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function TextStrokeTools({ currentElement }: TextStrokeToolsProps) {
	const inputSingleColorRef = useRef<HTMLInputElement>(null)

	const pathName = usePathname()
	const getCurrentTextStrokeWidth = (): number[] | undefined => {
		if (currentElement) {
			const styles = window.getComputedStyle(currentElement as HTMLElement)
			const strokeWidth = styles.getPropertyValue('-webkit-text-stroke-width')
			const matchResult = strokeWidth.match(/\d+\.?\d*?(?=px)/)
			if (matchResult) {
				return [Number(matchResult[0])]
			}
		}
		return undefined
	}

	const getCurrentTextStrokeColor = () => {
		if (currentElement) {
			const styles = window.getComputedStyle(currentElement as HTMLElement)
			const strokeColor = styles.getPropertyValue('-webkit-text-stroke-color')

			return rgbToHex(strokeColor)
		}

		return undefined
	}

	const [text, setText] = useState<string>(
		getCurrentTextStrokeWidth()?.toString() || '0'
	)

	const currentVariableForTextStrokeRef = useRef<string[]>([])

	if (currentElement) {
		currentVariableForTextStrokeRef.current[0] =
			getCurrentTextStrokeWidth()?.toString() || '0px'
		currentVariableForTextStrokeRef.current[1] =
			getCurrentTextStrokeColor()?.toString() || 'black'
	} else {
		currentVariableForTextStrokeRef.current[0] = '0px'
		currentVariableForTextStrokeRef.current[1] = 'black'
	}

	const [textStrokeColor, setTextStrokeColor] = useState<string>(
		currentVariableForTextStrokeRef.current[1]
	)

	const onSetTextStroke = (value: number[]) => {
		setText(value.toString())

		currentVariableForTextStrokeRef.current[0] = value[0].toString() + 'px'

		if (currentElement) {
			;(currentElement as HTMLElement).style.setProperty(
				'-webkit-text-stroke',
				`${currentVariableForTextStrokeRef.current[0]} ${currentVariableForTextStrokeRef.current[1]}`
			)
		}
	}

	const onChangeTextStrokeColor = (color: string) => {
		if (currentElement) {
			setTextStrokeColor(color)

			currentVariableForTextStrokeRef.current[1] = color
			;(currentElement as HTMLElement).style.setProperty(
				'-webkit-text-stroke-color',
				color
			)
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Text Stroke'
				>
					<PenTool strokeWidth={0.5} />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className='relative w-80 h-[50px] p-0 rounded-[25px] border-none'
				onBlur={() =>
					updateInlineStyles(
						currentElement as HTMLElement,
						pathName,
						'textStroke'
					)
				}
			>
				<Arrow width={10} height={5} />

				<div className='absolute top-0 w-[300px] z-20'>
					<span className='w-full absolute top-1/2 transform -translate-y-1/2 z-30 pointer-events-none text-slate-50 text-center text-stroke-05-black'>
						{' '}
						Text Stroke - <span>{text}px</span>
					</span>
					<Slider
						onValueChange={n => onSetTextStroke(n)}
						defaultValue={getCurrentTextStrokeWidth()}
						min={0}
						max={10}
						step={0.5}
						className='[&>span:first-child]:h-[50px] [&>span:nth-child(2)>span]:h-[50px] [&>span:nth-child(2)>span]:w-[50px] [&>span:nth-child(2)>span]:h-[50px]'
					/>
				</div>

				<div className='absolute top-0 right-[-1px] overflow-hidden w-[50px] h-[50px] z-10 rounded-tr-[25px] rounded-br-[25px] cursor-pointer hover:scale-105 transition'>
					<div
						className='relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] overflow-hidden rounded-md'
						onClick={() => inputSingleColorRef.current?.click()}
					>
						<Input
							onChange={e => onChangeTextStrokeColor(e.target.value)}
							value={textStrokeColor}
							type='color'
							className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] p-0 cursor-pointer border-none rounded-none pointer-events-none'
							tabIndex={-1}
							ref={inputSingleColorRef}
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
