'use server'

import { componentStyles } from '@/shared/initial-styles/style-component'
import { sectionStyles } from '@/shared/initial-styles/style-section'
import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { getLastUrlSegment } from '@/shared/utils/get-last-url-segment'
import { revalidatePath } from 'next/cache'
import { getIdPage } from '../../page/get/get-id-page'

type CreateSection = {
	url: string
	name: string
	rPath?: string
}

const createSection = async ({
	url: unprocessedUrl,
	name,
	rPath,
}: CreateSection) => {
	try {
		const processedUrl = getLastUrlSegment(unprocessedUrl)
		if (!processedUrl)
			return {
				success: false,
				error:
					'Section not created, because function getLastUrlSegment returned null, error in file: actions/section/set/create-section.ts',
			}

		const { data: id } = await getIdPage(processedUrl)

		if (!id)
			return {
				success: false,
				error:
					'Section not created. ID page not found. Error in file: actions/section/set/create-section.ts',
			}

		const transaction = await prisma.$transaction(async prisma => {
			const newPosition =
				(await prisma.section.count({
					where: { pageId: id },
				})) + 1

			const responseSection = await prisma.section.create({
				data: {
					...sectionStyles,
					name,
					pageId: id,
					position: newPosition,
				},
			})

			const responseElement = await prisma.component.create({
				data: {
					type: 'text',
					...componentStyles,
					tag: 'div',
					textContent: name,
					sectionId: responseSection.id,
					position: 1,
				},
			})

			return { responseSection, responseElement }
		})

		if (rPath) {
			await revalidatePath(rPath, 'page')
		}

		return { success: true, data: transaction.responseSection }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { createSection }
