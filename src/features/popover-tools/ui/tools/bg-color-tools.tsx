'use client'

import { getGradientColor } from '@/shared/helpers/color/get-gradient-color'
import { rgbToHex } from '@/shared/helpers/color/rgb-to-hex'
import { updateInlineStyles } from '@/shared/helpers/update-inline-styles'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Input } from '@/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Arrow } from '@radix-ui/react-popover'
import { PaintBucket, RotateCcw } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

type BGColorToolsProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function BGColorTools({ currentElement }: BGColorToolsProps) {
	const inputSingleColorRef = useRef<HTMLInputElement>(null)
	const inputFirstColorRef = useRef<HTMLInputElement>(null)
	const inputSecondColorRef = useRef<HTMLInputElement>(null)

	const [backgroundColor, setBackgroundColor] = useState<string>(
		currentElement
			? rgbToHex(window.getComputedStyle(currentElement).background)
			: '#ffffff'
	)

	const [backgroundGradient, setBackgroundGradient] = useState<string[]>(
		getGradientColor(currentElement)
	)

	const pathName = usePathname()

	// Функция для сброса цвета
	const onResetBackgroundColor = () => {
		setBackgroundColor('#ffffff')

		if (currentElement) {
			;(currentElement as HTMLElement).style.setProperty('background', 'none')
		}
	}

	// Функция для изменения цвета
	const onChangeColor = (color: string) => {
		if (currentElement) {
			setBackgroundColor(color)
			;(currentElement as HTMLElement).style.setProperty('background', color)
		}
	}

	// Функция для изменения цвета background gradient
	const onChangeBackgroundColor = (color: string, type: 'first' | 'second') => {
		setBackgroundGradient(colors => {
			const newColors = [...colors]
			newColors[type === 'first' ? 0 : 1] = color
			return newColors
		})
		if (currentElement) {
			;(currentElement as HTMLElement).style.setProperty(
				'background',
				`linear-gradient(to right, ${
					type === 'first' ? color : backgroundGradient[0]
				}, ${type === 'second' ? color : backgroundGradient[1]})`
			)
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Background color'
				>
					<PaintBucket size={28} strokeWidth={0.9} />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className='w-80 p-0 rounded-md overflow-hidden'
				onBlur={() =>
					updateInlineStyles(
						currentElement as HTMLElement,
						pathName,
						'background'
					)
				}
			>
				<Arrow width={100} height={5} className='fill-slate-200 ' />
				<Carousel className='w-full max-w-xs'>
					<CarouselContent>
						<CarouselItem>
							<div className='relative overflow-hidden w-full h-[200px]'>
								<button
									className='absolute top-0 right-0 w-[50px] h-[50px] p-[12px] cursor-pointer inline-flex items-center justify-center rounded-bl-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-slate-100 z-30'
									aria-label='Change text'
									onClick={onResetBackgroundColor}
								>
									<RotateCcw size={15} strokeWidth={0.5} />
								</button>
								<span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-[25px] text-slate-50 text-stroke-05-black z-30 pointer-events-none'>
									BACKGROUND MONOTONE
								</span>
								<div
									className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[230px] overflow-hidden rounded-md'
									onClick={e => {
										inputSingleColorRef.current?.click()
									}}
								>
									<Input
										onChange={e => {
											onChangeColor(e.target.value)
										}}
										value={backgroundColor}
										type='color'
										className='w-[340px] h-[230px] p-0 cursor-pointer border-none rounded-none pointer-events-none'
										data-special
										ref={inputSingleColorRef}
									/>
								</div>
							</div>
						</CarouselItem>

						<CarouselItem>
							<div className='relative overflow-hidden w-full h-[200px]'>
								<button
									className='absolute top-0 right-0 w-[50px] h-[50px] p-[12px] cursor-pointer inline-flex items-center justify-center rounded-bl-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-slate-100 z-30'
									aria-label='Change text'
									onClick={onResetBackgroundColor}
									tabIndex={1}
								>
									<RotateCcw size={15} strokeWidth={0.5} />
								</button>

								<span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-[25px] text-slate-50 text-stroke-05-black z-30 pointer-events-none'>
									BACKGROUND GRADIENT
								</span>

								<div
									className='absolute top-1/2 left-[-5px] transform -translate-y-1/2 w-[162px] h-[230px] overflow-hidden rounded-md'
									onClick={e => {
										inputFirstColorRef.current?.click()
									}}
								>
									<Input
										onChange={e =>
											onChangeBackgroundColor(e.target.value, 'first')
										}
										type='color'
										value={backgroundGradient[0]}
										className='w-[180px] h-[250px] p-0 cursor-pointer border-none rounded-none pointer-events-none'
										tabIndex={-1}
										ref={inputFirstColorRef}
									/>
								</div>

								<div
									className='absolute top-1/2 right-0 transform -translate-y-1/2 w-[162px] h-[230px] overflow-hidden rounded-md'
									onClick={e => {
										inputSecondColorRef.current?.click()
									}}
								>
									<Input
										onChange={e =>
											onChangeBackgroundColor(e.target.value, 'second')
										}
										type='color'
										value={
											backgroundGradient.length === 1
												? '#000000'
												: backgroundGradient[1]
										}
										className='w-[180px] h-[250px] p-0 cursor-pointer border-none rounded-none pointer-events-none'
										tabIndex={-1}
										ref={inputSecondColorRef}
									/>
								</div>
							</div>
						</CarouselItem>
					</CarouselContent>
				</Carousel>
			</PopoverContent>
		</Popover>
	)
}
