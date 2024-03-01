import { updateInlineStyles } from '@/shared/helpers/update-inline-styles'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'
import { MarginIcon } from '@radix-ui/react-icons'
import { Arrow } from '@radix-ui/react-popover'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MarginToolProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function MarginTool({ currentElement }: MarginToolProps) {
	const parrentElement = currentElement?.parentElement
	const pathName = usePathname()

	const getCurrentMarginNumbers = (): number[] | undefined => {
		if (parrentElement) {
			const style = window.getComputedStyle(parrentElement as HTMLElement)
			const marginTop = parseFloat(style.marginTop)
			const marginRight = parseFloat(style.marginRight)
			const marginBottom = parseFloat(style.marginBottom)
			const marginLeft = parseFloat(style.marginLeft)

			// Возвращаем массив значений margin
			return [marginTop, marginRight, marginBottom, marginLeft]
		}
		return undefined
	}

	const [marginValues, setMarginValues] = useState<number[]>(() => {
		const initialMargin = getCurrentMarginNumbers()

		return initialMargin || [0, 0, 0, 0]
	})

	useEffect(() => {
		setMarginValues(() => {
			const initialMargin = getCurrentMarginNumbers()
			return initialMargin || [0, 0, 0, 0]
		})
	}, [parrentElement])

	const onSetMargin = (v: number[], index: number) => {
		const value = v[0]

		// Обновляем состояние с новыми значениями margin
		setMarginValues(prev => {
			const updatedValues = [...prev]
			updatedValues[index] = value
			return updatedValues
		})

		// Применяем значения margin к текущему элементу
		if (parrentElement) {
			const marginStyles: (keyof CSSStyleDeclaration)[] = [
				'marginTop',
				'marginRight',
				'marginBottom',
				'marginLeft',
			]
			;(parrentElement as HTMLElement).style[
				marginStyles[index] as any
			] = `${value}px`
		}
	}

	const getDefaultValue = (n: number) => {
		const a = getCurrentMarginNumbers()
		if (!a) return [0]

		return [a[n]]
	}

	return (
		<Popover
			onOpenChange={isOpen =>
				!isOpen &&
				updateInlineStyles(currentElement as HTMLElement, pathName, 'margin')
			}
		>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Margin'
				>
					<MarginIcon />
				</button>
			</PopoverTrigger>

			<PopoverContent className='flex flex-col justify-around items-center'>
				<Arrow width={10} height={5} />

				<span className=''>MARGIN</span>

				<div className='flex justify-around items-center w-[100%] mt-[10px]'>
					<div className='h-[200px] w-[50px] flex flex-col justify-center items-center'>
						<span>T</span>
						<Slider
							max={120}
							step={1}
							onValueChange={n => onSetMargin(n, 0)}
							defaultValue={getDefaultValue(0)}
							className='h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]'
							orientation='vertical'
						/>
						<span>{marginValues[0]}px</span>
					</div>
					<div className='h-[200px] w-[50px] flex flex-col justify-center items-center'>
						<span>R</span>
						<Slider
							max={120}
							step={1}
							onValueChange={n => onSetMargin(n, 1)}
							defaultValue={getDefaultValue(1)}
							className='h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]'
							orientation='vertical'
						/>
						<span>{marginValues[1]}px</span>
					</div>
					<div className='h-[200px] w-[50px] flex flex-col justify-center items-center'>
						<span>B</span>
						<Slider
							max={120}
							step={1}
							onValueChange={n => onSetMargin(n, 2)}
							defaultValue={getDefaultValue(2)}
							className='h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]'
							orientation='vertical'
						/>
						<span>{marginValues[2]}px</span>
					</div>
					<div className='h-[200px] w-[50px] flex flex-col justify-center items-center'>
						<span>L</span>
						<Slider
							max={120}
							step={1}
							onValueChange={n => onSetMargin(n, 3)}
							defaultValue={getDefaultValue(3)}
							className='h-[200px] w-[5px] [&>span:first-child]:h-[100%] [&>span:first-child]:w-[5px] [&>span:nth-child(2)]:left-[-7.5px]'
							orientation='vertical'
						/>
						<span>{marginValues[3]}px</span>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
