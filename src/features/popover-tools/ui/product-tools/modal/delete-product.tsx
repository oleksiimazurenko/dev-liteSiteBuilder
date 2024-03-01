'use client'

import { usePopoverToolsStore } from '@/shared/store/store'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { deleteProduct } from '@/shared/actions/product/set/delete-product'

export function DeleteProduct() {
	const { idProduct, setIsOpenPopoverTools } = usePopoverToolsStore()

	if (!idProduct) return null

	const onHandleClick = async (idProduct: string) => {
		const { success, data } = await deleteProduct(idProduct)

		success
			? toast.success('Product deleted')
			: toast.error('Error deleting product')

		setIsOpenPopoverTools(false)
	}

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='text-center'>
				Are you sure you want to delete the product?
			</div>

			<Button
				className='bg-red-400 hover:bg-red-500 mt-2'
				onClick={() => {
					onHandleClick(idProduct)
					setIsOpenPopoverTools(false)
				}}
			>
				Delete
			</Button>
		</div>
	)
}
