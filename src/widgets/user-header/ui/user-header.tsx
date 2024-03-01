import { UserNavbar } from '@/features/user-navbar'
import { CreatePageTrigger, DeletePageTrigger } from '@/features/popover-tools'

type UserHeaderProps = {
	className?: string
}

export async function UserHeader({ className }: UserHeaderProps) {
	return (
		<header
			className={`absolute top-0 left-1/2 transform -translate-x-1/2 py-[30px] w-full z-50 ${className}`}
		>
			<UserNavbar
				linkColor='white'
				typeNavbar='header'
				CreatePageTrigger={CreatePageTrigger}
				DeletePageTrigger={DeletePageTrigger}
			/>
		</header>
	)
}
