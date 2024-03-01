'use server'

import prisma from '@/shared/lib/prisma-client'
import { Product } from '@prisma/client'

const getProductsList = async () => {
	const data: Product[] = await prisma.product.findMany()

	return data
}

export { getProductsList }
