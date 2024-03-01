'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

const deleteSection = async (id: string, rPath?: string) => {
	try {
		// Начинаем транзакцию
		const transaction = await prisma.$transaction([
			// Удаляем все компоненты, связанные с этой секцией
			prisma.component.deleteMany({
				where: { sectionId: id },
			}),
			// Удаляем саму секцию
			prisma.section.delete({
				where: { id },
			}),
		])

		if (rPath) revalidatePath(rPath, 'page')

		// Проверяем, успешно ли выполнена транзакция для deleteMany
		const componentsDeleted = transaction[0].count > 0
		const sectionDeleted = transaction[1] !== null // Проверяем, что секция была удалена

		return componentsDeleted && sectionDeleted
			? { success: true }
			: { success: false }
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { deleteSection }
