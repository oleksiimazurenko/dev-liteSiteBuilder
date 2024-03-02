'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

const deletePage = async (id: string) => {
	try {
		const transactionResult = await prisma.$transaction(async prisma => {
			// Получаем идентификаторы секций, связанные с этой страницей
			const sections = await prisma.section.findMany({
				where: { pageId: id },
				select: { id: true }, // Только идентификаторы секций
			})
			const sectionIds = sections.map(section => section.id)

			// Удаляем компоненты, связанные с этими секциями
			if (sectionIds.length > 0) {
				await prisma.component.deleteMany({
					where: {
						sectionId: { in: sectionIds },
					},
				})
			}

			// Удаляем секции, связанные с этой страницей
			await prisma.section.deleteMany({
				where: {
					pageId: id,
				},
			})

			// Удаляем страницу
			return await prisma.page.delete({
				where: {
					id,
				},
			})
		})

		revalidatePath('/[pageSlug]', 'layout')

		return { success: true, data: transactionResult }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { deletePage }
