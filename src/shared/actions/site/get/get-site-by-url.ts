'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { getLastUrlSegment } from '@/shared/utils/get-last-url-segment'

const getSiteByUrl = async (url: string) => {
	try {

		const processedUrl = getLastUrlSegment(url)
		if (!processedUrl)
		return {
			success: false,
			error:
				'ID site not found, because function getLastUrlSegment returned null, error in file: actions/site/get/get-site-by-url.ts',
		}

		const site = await prisma.site.findUnique({
			where: {
				url: processedUrl,
			},
			include: {
				pages: {
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
				},
			},
		})

		if (!site) return { success: false, error: `The site with URL '${processedUrl}' was not found. Error in file: actions/site/get/get-site-by-url.ts`}

		return { success: true, data: site }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { getSiteByUrl }
