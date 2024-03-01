'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainLogo({ linkColor }: { linkColor: 'white' | 'black' }) {
	const pathname = usePathname()

	return (
		<Link href='/' className='px-[20px]'>
			<Image
				className={cn('', {
					['border-b']: pathname === '/',
				})}
				src={`/${linkColor === 'white' ? 'logo-white' : 'logo-black'}.svg`}
				width={108}
				height={35}
				alt='logo'
			/>
		</Link>
	)
}
