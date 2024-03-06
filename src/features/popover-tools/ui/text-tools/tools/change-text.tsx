'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Textarea } from '@/shared/ui/textarea'
import { Arrow } from '@radix-ui/react-popover'
import { TextCursor } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { updateTextContent } from '@/shared/helpers/update-text-content'

type ChangeTextProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function ChangeText({ currentElement }: ChangeTextProps) {
	const [textareaValue, setTextareaValue] = useState<string>('')

	const pathName = usePathname()

	return (
		<Popover
			onOpenChange={isOpen =>
				isOpen && setTextareaValue(currentElement?.textContent as string)
			}
		>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Change text'
				>
					<TextCursor size={15} strokeWidth={1.7} />
				</button>
			</PopoverTrigger>

			<PopoverContent
				className='w-80 p-2'
				onBlur={() =>
					updateTextContent(
						currentElement as HTMLElement,
						pathName,
						'textContent'
					)
				}
			>
				<Arrow width={10} height={5} />
				<Textarea
					className='resize-none'
					defaultValue={textareaValue}
					onChange={e => {
						if (currentElement) {
							;(currentElement as HTMLElement).textContent = e.target.value

							if (
								currentElement.textContent?.length === 0 ||
								currentElement.textContent?.trim().length === 0
							) {
								;(currentElement as HTMLElement).textContent =
									'Default text element'
							}
						}
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}
