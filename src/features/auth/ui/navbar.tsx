'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/shared/ui/button'

export const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav className='bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm'>
			<div className='flex gap-x-2'>
				<Button
					asChild
					variant={pathname === '/info-profil' ? 'default' : 'outline'}
				>
					<Link href='/info-profil'>Info profil</Link>
				</Button>
				<Button
					asChild
					variant={pathname === '/site-users' ? 'default' : 'outline'}
				>
					<Link href='/site-users'>Site users</Link>
				</Button>
				<Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
					<Link href='/admin'>Admin</Link>
				</Button>
				<Button
					asChild
					variant={pathname === '/settings' ? 'default' : 'outline'}
				>
					<Link href='/settings'>Settings</Link>
				</Button>
			</div>
		</nav>
	)
}
