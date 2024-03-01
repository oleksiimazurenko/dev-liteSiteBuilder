'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

type SortComponents = {
	currentItems: { id: string }[]
	rPath?: string
}

const sortComponents = async ({ currentItems, rPath }: SortComponents) => {
	try {
		const item = await prisma.component.findUnique({
			where: { id: currentItems[0].id },
		})

		if (!item || item.sectionId === null) {
			throw new Error(
				'Item not found or sectionId is null, error in sortComponents'
			)
		}

		const sectionId = item.sectionId

		for (const [index, item] of currentItems.entries()) {
			const result = await prisma.component.updateMany({
				where: {
					AND: [{ id: item.id }, { sectionId: sectionId }],
				},
				data: {
					position: index + 1,
				},
			})

			if (index === 0) {
			}

			if (result.count === 0) {
				console.log(
					`No component updated for id: ${item.id} and sectionId: ${sectionId}`
				)
				return {
					success: false,
					error: `No component updated for id: ${item.id} and sectionId: ${sectionId}`,
				}
			}
		}

		if (rPath) {
			await revalidatePath(rPath, 'page')
		}

		return { success: true }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { sortComponents }
