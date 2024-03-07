'use client'

import { logout } from '@/shared/lib/auth/actions/set/logout'
import { Button } from '@/shared/ui/button'
import { LogOut as LogOutIcon } from 'lucide-react'
import cn from 'classnames'
import { LogOutProps } from '@/shared/types/props'

export function LogOut({className}: LogOutProps) {
	return (
		<Button
		className={cn(
			"dark:bcd2 bcw2 bottom-0 left-0 flex h-[30px] w-[30px] items-center justify-center border border-none border-opacity-40 p-0 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.07] hover:bg-neutral-400 active:scale-105 dark:border-none", {
				[className as string]: className,
			}
		)}
		onClick={() => logout()}
	>
		<LogOutIcon className="dark:stroke-neutral-400 stroke-neutral-500" />
	</Button>
	)
}