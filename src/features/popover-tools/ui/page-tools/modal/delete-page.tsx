'use client'

import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { deletePage } from '@/shared/actions/page/set/delete-page'
import { usePopoverToolsStore } from '@/shared/store/editable-group-store'

export function DeletePage() {
	const { idPage, setIsOpenPopoverTools } = usePopoverToolsStore()

	if (!idPage) return null

	const onHandleClick = async () => {
		const { success, data } = await deletePage(idPage)

		success ? toast.success('Page deleted') : toast.error('Error deleting page')

		setIsOpenPopoverTools(false)
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='text-center'>
				Are you sure you want to delete the page?
			</div>

			<Link href='/' className='mt-2'>
				<Button className='bg-red-400 hover:bg-red-500' onClick={onHandleClick}>
					Delete
				</Button>
			</Link>
		</div>
	)
}
