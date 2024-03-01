'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { Component, Section } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const updateElement = async (
	id: string,
	model: string,
	key: string,
	value: Record<string, string> | string | null,
	rPath?: string
) => {
	try {
		let response: Component | Section | null = null

		switch (model) {
			case 'component':
				response = await prisma.component.update({
					where: { id: id },
					data: { [key]: value },
				})

				await prisma.$disconnect()
				break
			case 'section':
				response = await prisma.section.update({
					where: { id: id },
					data: { [key]: value },
				})

				await prisma.$disconnect()
				break
		}

		rPath && revalidatePath(rPath, 'page') // Если нужно, то пересобираем страницу

		if (response === null) return { success: false } // Возвращаем ошибку если не удалось обновить элемент

		return { success: true, data: response } // Возвращаем успешный результат
	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { updateElement }
