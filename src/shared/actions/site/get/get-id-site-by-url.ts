'use server';

import prisma from '@/shared/lib/prisma-client';
import { getErrorMessage } from '@/shared/utils/extract-error-message';
import { getLastUrlSegment } from '@/shared/utils/get-last-url-segment'

const getIdSiteByUrl = async (url: string) => {
	try {

		const processedUrl = getLastUrlSegment(url)
		if (!processedUrl)
		return {
			success: false,
			error:
				'ID site not found, because function getLastUrlSegment returned null, error in file: actions/site/get/get-id-page.ts',
		}

		const site = await prisma.site.findUnique({
			where: {
				url: processedUrl,
			},
		});

		if (site) {
			return { success: true, data: site.id }; // Успешно найдена страница
		} else {
			return { success: false, error: 'ID Site not found' }; // Страница не найдена
		}
	} catch (error) {
		console.error(getErrorMessage(error));
		return { success: false, error: getErrorMessage(error) }; // Возвращаем ошибку
	}
};

export { getIdSiteByUrl };