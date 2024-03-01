import { PopoverTools } from '@/features/popover-tools'
import { Toaster } from '@/shared/ui/sonner'
import { UserFooter } from '@/widgets/user-footer'
import { UserHeader } from '@/widgets/user-header'
import { JetBrains_Mono } from 'next/font/google'

const merienda = JetBrains_Mono({ subsets: ['latin'] })

export async function generateStaticParams() {
	const { data } = await getSites()
	if (!data) return []

	return data.map(({ url }) => ({
		site: url,
	}))
}

export async function generateMetadata({
	params: { site },
}: {
	params: { site: string }
}) {
	const { data } = await getSiteByUrl(site)

	return {
		title: data?.title,
		description: data?.description,
	}
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className={merienda.className}>
			<UserHeader className='max-w-[2100px] m-auto' />
			<main className='max-w-[2100px] m-auto'>{children}</main>
			<Toaster />
			<PopoverTools />
			<UserFooter className='max-w-[2100px] m-auto' />
		</div>
	)
}