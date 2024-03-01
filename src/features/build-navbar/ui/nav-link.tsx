'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink({ slug, children }: { slug: string; children: React.ReactNode }) {
	const pathname = usePathname()
	return (
		<Link 
			className={cn('px-[20px] text-[12px] pb-[2px]', {
				['border-b']: pathname === slug
			})}
			href={slug}
		>
			{children}
		</Link>
	)
}