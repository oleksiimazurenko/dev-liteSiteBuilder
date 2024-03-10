import { ProfessionObject } from '../types/dectionary'

const isProfessionObjectArray = (array: any): array is ProfessionObject[] => {
  return (
    Array.isArray(array) &&
    array.every(
      (item) =>
        typeof item === "object" &&
        "profession" in item &&
        "imagePreview" in item,
    )
  );
}

export { isProfessionObjectArray }