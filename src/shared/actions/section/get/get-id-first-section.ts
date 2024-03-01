'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { getPageByUrl } from '../../page/get/get-page-by-url'

const getIdFirstSection = async (url: string) => {
	try {
		const { data } = await getPageByUrl(url)

		if (!data) {
			return {
				success: false,
				error:
					'Page not found. Error in file: shared/actions/section/get/get-id-section.ts',
			}
		}

		const section = await prisma.section.findFirst({
			where: {
				AND: [{ pageId: data.id }, { position: 1 }],
			},
		})

		if (section) {
			return { success: true, data: section.id }
		} else {
			return {
				success: false,
				error:
					'Section ID not found. Error in file: shared/actions/section/get/get-id-section.ts',
			}
		}
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { getIdFirstSection }
