import { PopoverTools } from '@/features/popover-tools'
import { getSiteByUrl } from '@/shared/actions/site/get/get-site-by-url'
import { getSites } from '@/shared/actions/site/get/get-sites'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { BuildFooter } from '@/widgets/build-footer'
import { BuildHeader } from '@/widgets/build-header'
import { JetBrains_Mono } from 'next/font/google'
import cn from 'classnames'

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
		<div className={cn('max-w-[2400px] m-auto', {
			[merienda.className]: true
		})}>
			<BuildHeader className='max-w-[2400px] m-auto' />
			<ScrollArea>{children}</ScrollArea>
			<PopoverTools />
			<BuildFooter className='max-w-[2400px] m-auto' />
		</div>
	)
}