'use server'

import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import prisma from '@/shared/lib/prisma-client'

const createProduct = async ({
	name,
	country,
	price,
	type,
	image,
	componentId,
}: {
	name: string
	country: string
	price: string
	type: 'normal' | 'best'
	image: string
	componentId: string | null
}) => {

	try {

		const responseCategory = await prisma.category.findMany()

		const categoryId = responseCategory.find(category => category.type === type)?.id

		if(!categoryId || !componentId) return { success: false, error: 'CategoryID or ComponentID not found. Error in file builder/actions/product/create-product.ts' }


		const response = await prisma.product.create({
			data: {
				name,
				country,
				price,
				type,
				image,
				categoryId,
				componentId 
			},
		})

		revalidatePath('/', 'page')

		return { success: true, data: response }

	} catch (error) {
		console.error(getErrorMessage(error))
		return { success: false, error: getErrorMessage(error) }
	}
}

export { createProduct }
