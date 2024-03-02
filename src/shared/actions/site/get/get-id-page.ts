'use server';

import prisma from '@/shared/lib/prisma-client';
import { getErrorMessage } from '@/shared/utils/extract-error-message';
import { getLastUrlSegment } from '@/shared/utils/get-last-url-segment'

const getIdPage = async (url: string) => {
	try {

		const processedUrl = getLastUrlSegment(url)
		if (!processedUrl)
		return {
			success: false,
			error:
				'ID page not found, because function getLastUrlSegment returned null, error in file: actions/page/get/get-id-page.ts',
		}

		const page = await prisma.page.findUnique({
			where: {
				url: processedUrl,
			},
		});

		if (page) {
			return { success: true, data: page.id }; // Успешно найдена страница
		} else {
			return { success: false, error: 'Страница не найдена' }; // Страница не найдена
		}
	} catch (error) {
		console.error(getErrorMessage(error));
		return { success: false, error: getErrorMessage(error) }; // Возвращаем ошибку
	}
};

export { getIdPage };