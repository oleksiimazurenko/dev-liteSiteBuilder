import { ProfessionObject } from '../types/dectionary'


const splitProfessions = (
  professions: ProfessionObject[],
  splitInto: number,
): ProfessionObject[][] => {
  const splitLength: number = Math.floor(professions.length / splitInto);
  let remainder: number = professions.length % splitInto;
  let result: ProfessionObject[][] = [];
  let startIndex: number = 0;

  for (let i = 0; i < splitInto; i++) {
    // Для каждого подмассива вычисляем длину, учитывая остаток
    const length: number = i < remainder ? splitLength + 1 : splitLength;
    // Используем метод slice для создания подмассива объектов и добавляем его в результат
    result.push(professions.slice(startIndex, startIndex + length));
    // Обновляем начальный индекс для следующего подмассива
    startIndex += length;
  }

  return result;
};

export { splitProfessions };
