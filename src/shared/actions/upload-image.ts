'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

const uploadImage = async (data: FormData, pathName: string) => {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Определение расширения файла на основе его MIME-типа
    const extension = getExtension(file.type)

    // Получение оригинального имени файла без расширения
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image'
    
    // Обрезка оригинального имени файла до 7 символов, если оно длиннее
    const truncatedName = originalName.length > 7 ? originalName.substring(0, 7) : originalName

    // Соединение обрезанного имени с расширением файла
    const newFileName = truncatedName + extension

    const path = join(process.cwd(), pathName, newFileName)
    await writeFile(path, buffer)

    console.log(`open ${path} to see the uploaded file`)

    return { 
        success: true,
        fileName: newFileName,
    }
}

const getExtension = (mimeType: string): string => {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpeg'
        case 'image/png':
            return '.png'
        case 'image/gif':
            return '.gif'
        // Добавьте дополнительные MIME-типы и их расширения по мере необходимости
        default:
            return '' // Возвращает пустую строку или можно выбросить ошибку, если MIME-тип не поддерживается
    }
}

export { uploadImage }
