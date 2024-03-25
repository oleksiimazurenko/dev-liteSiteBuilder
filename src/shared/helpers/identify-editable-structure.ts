type EditableElements = {
  type: "component" | "section" | null; // Добавляем новое свойство для определения типа элемента
  outerElement: HTMLElement | null;
  middleElement: HTMLElement | null;
  innerElement: HTMLElement | null;
};

export function identifyEditableStructure(
  element: HTMLElement | null,
): EditableElements {
  if (!element) {
    return {
      type: null,
      outerElement: null,
      middleElement: null,
      innerElement: null,
    };
  }

  const attributes = ["component", "section"];
  const attribute = attributes.find((attr) =>
    element.hasAttribute(`data-${attr}`),
  );

  if (!attribute) {
    throw new Error("Element has no recognized data attribute.");
  }

  // Define default return structure with the identified type
  const editableElements: EditableElements = {
    type: attribute as "component" | "section", // Устанавливаем тип на основе найденного атрибута
    outerElement: null,
    middleElement: null,
    innerElement: null,
  };

  switch (attribute) {
    case "component":
      editableElements.outerElement = element.closest("[data-outer]");
      editableElements.middleElement = element.closest("[data-middle]");
      editableElements.innerElement = element.hasAttribute("data-inner")
        ? element
        : null;
      break;
    case "section":
      editableElements.outerElement = element.hasAttribute("data-outer")
        ? element
        : null;
      editableElements.innerElement = element.querySelector("[data-inner]");
      // Здесь middleElement не устанавливается, так как поиск происходит только для внешнего и внутреннего элементов секции
      break;
  }

  return editableElements;
}
