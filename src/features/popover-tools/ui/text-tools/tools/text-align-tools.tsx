'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import {
	TextAlignCenterIcon,
	TextAlignJustifyIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
} from '@radix-ui/react-icons'
import { Arrow } from '@radix-ui/react-popover'
import { ArrowLeftRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateInlineStyles } from '../../../../../shared/helpers/update-inline-styles'

type TextAlignToolsProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function TextAlignTools({ currentElement }: TextAlignToolsProps) {
	const parrentElement = currentElement?.parentElement
	const [value, setValue] = useState<string | null>(null)
	const pathName = usePathname()

	useEffect(() => {
		if (parrentElement) {
			setValue(window.getComputedStyle(parrentElement).textAlign)
		}
	}, [parrentElement])

	return (
		<Popover
			onOpenChange={isOpen =>
				!isOpen &&
				updateInlineStyles(currentElement as HTMLElement, pathName, 'textAlign')
			}
		>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Text Align'
				>
					<ArrowLeftRight strokeWidth={0.5} />
				</button>
			</PopoverTrigger>

			<PopoverContent className='relative w-80'>
				<Arrow width={10} height={5} />

				<ToggleGroup
					type='single'
					rovingFocus={false}
					className='flex-wrap'
					value={value ? value : undefined}
					onValueChange={value => {
						if (parrentElement) {
							;(parrentElement as HTMLElement).style.textAlign = value
							setValue(value)
						}
					}}
				>
					<ToggleGroupItem value='left' aria-label='Toggle textalignleft'>
						<TextAlignLeftIcon className='h-4 w-4' />
					</ToggleGroupItem>

					<ToggleGroupItem value='center' aria-label='Toggle textaligncenter'>
						<TextAlignCenterIcon className='h-4 w-4' />
					</ToggleGroupItem>

					<ToggleGroupItem value='justify' aria-label='Toggle textalignjustify'>
						<TextAlignJustifyIcon className='h-4 w-4' />
					</ToggleGroupItem>

					<ToggleGroupItem value='right' aria-label='Toggle textalignright'>
						<TextAlignRightIcon className='h-4 w-4' />
					</ToggleGroupItem>
				</ToggleGroup>
			</PopoverContent>
		</Popover>
	)
}
