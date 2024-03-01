'use client'

import { updateInlineStyles } from '@/shared/helpers/update-inline-styles'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import {
	FontBoldIcon,
	FontItalicIcon,
	UnderlineIcon,
} from '@radix-ui/react-icons'
import { Arrow } from '@radix-ui/react-popover'
import { Baseline } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type TextDecorationToolsProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function TextDecorationTools({
	currentElement,
}: TextDecorationToolsProps) {
	const [values, setValues] = useState<string[] | null>(null)

	const pathName = usePathname()

	useEffect(() => {
		if (currentElement) {
			const newValues = (
				['fontWeight', 'fontStyle', 'textDecoration'] as Array<
					keyof CSSStyleDeclaration
				>
			)
				.map(style => {
					const value = window.getComputedStyle(currentElement)[style]
					switch (style) {
						case 'fontWeight':
							return value === 'bold' || (value && +value > 500)
								? 'bold'
								: undefined
						case 'fontStyle':
							return value === 'italic' ? 'italic' : undefined
						case 'textDecoration':
							return value && value.toString().split(' ')[0] === 'underline'
								? 'underline'
								: undefined
					}
				})
				.filter(Boolean) as string[]
			setValues(newValues)
		}
	}, [currentElement])

	const onHandleValueChange = (receivedValues: string[]) => {
		if (currentElement) {
			const findDifference = (
				prevArray: string[] | null,
				currArray: string[]
			) => {
				if (!prevArray) return { added: currArray[0] }

				const newElement = currArray.find(x => !prevArray.includes(x))
				const removedElement = prevArray.find(x => !currArray.includes(x))

				return {
					added: newElement, // null, если не найдено
					removed: removedElement, // null, если не найдено
				}
			}

			const { added, removed } = findDifference(values, receivedValues)

			if (added) {
				added === 'bold' &&
					((currentElement as HTMLElement).style.fontWeight = 'bold')
				added === 'italic' &&
					((currentElement as HTMLElement).style.fontStyle = 'italic')
				added === 'underline' &&
					((currentElement as HTMLElement).style.textDecoration = 'underline')
			}

			if (removed) {
				removed === 'bold' &&
					((currentElement as HTMLElement).style.fontWeight = 'normal')
				removed === 'italic' &&
					((currentElement as HTMLElement).style.fontStyle = 'normal')
				removed === 'underline' &&
					((currentElement as HTMLElement).style.textDecoration = 'none')
			}
			setValues(receivedValues)
		}
	}

	return (
		<Popover
			onOpenChange={isOpen =>
				!isOpen &&
				updateInlineStyles(
					currentElement as HTMLElement,
					pathName,
					'textDecoration'
				)
			}
		>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Font Size'
				>
					<Baseline strokeWidth={0.5} />
				</button>
			</PopoverTrigger>

			<PopoverContent className='relative w-80'>
				<Arrow width={10} height={5} />

				<ToggleGroup
					type='multiple'
					rovingFocus={false}
					className='flex-wrap'
					value={values ? values : undefined}
					onValueChange={onHandleValueChange}
				>
					<ToggleGroupItem value='bold' aria-label='Toggle bold'>
						<FontBoldIcon className='h-4 w-4' />
					</ToggleGroupItem>

					<ToggleGroupItem value='italic' aria-label='Toggle italic'>
						<FontItalicIcon className='h-4 w-4' />
					</ToggleGroupItem>

					<ToggleGroupItem value='underline' aria-label='Toggle underline'>
						<UnderlineIcon className='h-4 w-4' />
					</ToggleGroupItem>
				</ToggleGroup>
			</PopoverContent>
		</Popover>
	)
}
