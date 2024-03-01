'use server'

import prisma from '@/shared/lib/prisma-client'
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { revalidatePath } from 'next/cache'

type SortSection = {
	currentItems: { id: string }[]
	rPath?: string
}

const sortSection = async ({ currentItems, rPath }: SortSection) => {
	try {
		for (const [index, item] of currentItems.entries()) {
			// const result = await prisma.section.findUnique({
			// 	where: { id: item.id },
			// 	select: { sectionStyles: true },
			// })

			// // Проверяем, что sectionStyles действительно объект, иначе устанавливаем пустой объект
			// let sectionStyles =
			// 	result?.sectionStyles && typeof result.sectionStyles === 'object'
			// 		? result.sectionStyles
			// 		: {}

			// let initialStyles = { ...sectionStyles }

			// // Для первого элемента добавляем уникальные стили
			// if (index === 0) {
			// 	initialStyles = {
			// 		...initialStyles,
			// 		minHeight: '300px',
			// 		paddingTop: '120px',
			// 	}
			// }

			// if(index !== 0){
			// 	initialStyles = {
			// 		...initialStyles,
			// 		minHeight: '230px',
			// 		paddingTop: '40px',
			// 	}
			// }

			await prisma.section.update({
				where: { id: item.id },
				data: {
					position: index + 1,
					// sectionStyles: initialStyles,
				},
			})
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

export { sortSection }
