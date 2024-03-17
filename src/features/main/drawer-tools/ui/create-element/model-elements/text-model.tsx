'use client'

import { Type } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { createElement } from '@/shared/actions/element/set/create-element'

type TextElementProps = {
	id: string
}

export function TextModel({ id }: TextElementProps) {
	const pathName = usePathname()

	const onHandleClick = () => {
		createElement({
			id,
			type: 'text',
			textContent: 'Default text',
			outerStyles: {},
			innerStyles: {
				marginTop: '20px',
				textShadow: '1px 1px 2px rgba(0, 0, 0, 0.75)',
				fontSize: '1.25rem',
				color: '#f8fafc',
				textAlign: 'center',
			},
			tag: 'div',
			rPath: pathName,
			width: null,
			height: null,
			src: null,
			alt: null,
			href: null
		})
	}

	return (
		<>
			<button
				className='w-10 h-10 p-[12px] cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent'
				aria-label='Padding'
				onClick={() => onHandleClick()}
			>
				<Type strokeWidth={0.75} />
			</button>
		</>
	)
}