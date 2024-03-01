'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

type DeleteElement = {
	id: string
	rPath?: string
}

const deleteElement = async ({ id, rPath }: DeleteElement) => {
	try {
		const response = await prisma.component.delete({
			where: {
				id: id,
			},
		})

		if (rPath) revalidatePath(rPath, 'page')

		return response ? { success: true, data: response } : { success: false }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { deleteElement }
