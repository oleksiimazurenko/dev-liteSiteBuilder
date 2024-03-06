'use client'

import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Arrow } from '@radix-ui/react-popover'
import { Trash2 } from 'lucide-react'
import { deleteSection } from '../../../../../shared/actions/section/set/delete-section'
import { usePathname } from 'next/navigation'
import { getPageByUrl } from '@/shared/actions/page/get/get-page-by-url'
import { useEffect, useRef } from 'react'
import { usePopoverToolsStore } from '@/shared/store/editable-group-store'

type RemoveSectionProps = {
	currentElement: HTMLElement | Element | undefined | null
}

export function DeleteSection({ currentElement }: RemoveSectionProps) {
	const { setIsOpenPopoverTools } = usePopoverToolsStore()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const pathName = usePathname()

	useEffect(() => {
		(async () => {
			const { data } = await getPageByUrl(pathName)
			if(data?.sections.length === 1) {
				buttonRef.current?.setAttribute('disabled', 'true')
			}
		})()
	}, [])

	const onRemoveSection = () => {
		setIsOpenPopoverTools(false)

		const id = currentElement?.getAttribute('data-id')

		id && deleteSection(id, pathName)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
					aria-label='Trash'
					ref={buttonRef}
				>
					<Trash2 strokeWidth={0.9} />
				</button>
			</PopoverTrigger>

			<PopoverContent>
				<Arrow width={10} height={5} />
				<div className='flex flex-col justify-center items-center'>
					<div className='text-center'>
						Are you sure you want to delete the section?
					</div>

					<Button
						className='bg-red-400 hover:bg-red-500 mt-2'
						onClick={onRemoveSection}
					>
						Delete
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
