'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { getLastUrlSegment } from '@/shared/utils/get-last-url-segment'

const getPageByUrl = async (url: string) => {
	try {

		const processedUrl = getLastUrlSegment(url)
		if (!processedUrl)
		return {
			success: false,
			error:
				'ID page not found, because function getLastUrlSegment returned null, error in file: actions/page/get/get-page-by-url.ts',
		}

		const page = await prisma.page.findUnique({
			where: {
				url: processedUrl,
			},
			include: {
				sections: {
					include: {
						components: {
							include: {
								products: true,
							},
						},
					},
				},
			},
		})

		if (!page) return { success: false, error: `The page with URL '${processedUrl}' was not found. Error in file: actions/page/get/get-page-by-url.ts`}

		return { success: true, data: page }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { getPageByUrl }
