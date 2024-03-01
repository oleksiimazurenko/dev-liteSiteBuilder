'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'

const getPages = async () => {
	try {
		const pages = await prisma.page.findMany()
		return { success: true, data: pages }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { getPages }
