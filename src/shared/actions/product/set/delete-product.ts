'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

const deleteProduct = async (id: string) => {
	try {
		const response = await prisma.product.delete({
			where: {
				id,
			},
		})
		revalidatePath('/', 'page')

		return { success: true, data: response }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { deleteProduct }
