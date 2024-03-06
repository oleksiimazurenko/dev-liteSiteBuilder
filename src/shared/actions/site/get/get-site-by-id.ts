'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'

const getSiteById = async (id: string) => {
	try {

		const site = await prisma.site.findUnique({
			where: {
				id,
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

		if (!site) return { success: false, error: `The site with ID '${id}' was not found. Error in file: actions/site/get/get-site-by-id.ts`}

		return { success: true, data: site }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { getSiteById }
