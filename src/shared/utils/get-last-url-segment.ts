const getLastUrlSegment = (unprocessedUrl: string) => {

	// Проверка на то, что строка начинается с слеша и букв, а точнее обработанная ли уже строка
	const isProcessedURL = (str: string) => {
		const regex = /^\/[a-zA-Z]+/;
		return !regex.test(str);
	}
	if (isProcessedURL(unprocessedUrl)) return unprocessedUrl


  if (unprocessedUrl === '/') {
    return '/';
  }

  // Регулярное выражение для поиска сегментов URL
  const regex = /\/([^\/]+)/g;
  // Находим все совпадения
  const matches = [...unprocessedUrl.matchAll(regex)];
  // Проверяем, есть ли совпадения, и возвращаем последний сегмент
  if (matches.length > 0) {
    const lastMatchIndex = matches.length - 1;
    return matches[lastMatchIndex][1];
  }

  // Если совпадений нет, возвращаем пустую строку или null
  return null;
}

export { getLastUrlSegment }
