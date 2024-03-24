import { toast } from "sonner";
import { updateElement } from "../actions/element/set/update-element";

const modelsPrismaArray = ["component", "section"];

const ruleComponentStyles = [
  { outer: "outerStyles" },
  { middle: "middleStyles" },
  { inner: "innerStyles" },
];

const ruleSectionStyles = [
  { outer: "sectionStyles" },
  { inner: "containerStyles" },
];

const updateInlineStyles = async (
  element: HTMLElement | SVGSVGElement,
  pathName: string,
  locationStyles: string,
) => {

  // Функция для проверки наличия атрибута в элементе
  const hasPrismaAttribute = () =>
    modelsPrismaArray.some((attribute) =>
      element?.hasAttribute(`data-${attribute}`),
    );




  // Функция для получения модели
  const getModel = () =>
    modelsPrismaArray.find((attribute) =>
      element?.hasAttribute(`data-${attribute}`),
    ) || "";




  // Функция для преобразования стилей kebab-case в camelCase (например: text-align -> textAlign)
  const kebabToCamelCase = (string: string): string => {
    return string.replace(/(-\w)/g, (match) => match[1].toUpperCase());
  };




  // Функция для сериализации стилей
  const serializeInlineStyles = (
    style: CSSStyleDeclaration,
  ): Record<string, string> => {
    let inlineStyles: Record<string, string> = {};

    for (let i = 0; i < style.length; i++) {
      const propertyName: string = style[i];

      if (
        ["outline-color", "outline-style", "outline-width"].includes(
          propertyName,
        )
      ) {
        continue;
      }
      const camelCasePropertyName = kebabToCamelCase(propertyName);
      inlineStyles[camelCasePropertyName] =
        style.getPropertyValue(propertyName);
    }

    return inlineStyles;
  };




  const getSectionStyles = (element: HTMLElement): CSSStyleDeclaration => {

    const object = ruleSectionStyles.find(
      (item) => Object.keys(item)[0] === locationStyles,
    );

    switch (object && Object.values(object)[0]) {
      case "sectionStyles": 
        return (element as HTMLElement).style
      case "containerStyles":
        return (element.firstChild as HTMLElement).style;
      default:
        return (element as HTMLElement).style
    }

  };




  const getComponentStyles = (element: HTMLElement): CSSStyleDeclaration => {
    const object = ruleComponentStyles.find(
      (item) => Object.keys(item)[0] === locationStyles,
    );

    switch (object && Object.values(object)[0]) {
      case "outerStyles":
        const outer = element.closest('[data-outer]') as HTMLElement;
        return outer && outer.style
      case "middleStyles":
        const middle = element.closest('[data-middle]') as HTMLElement;
        return middle.style
      case "innerStyles":
        const inner = element.closest('[data-inner]') as HTMLElement;
        return inner && inner.style
      default:
        return (element.parentElement?.parentElement as HTMLElement).style
    }
  };



  // Функция для получения data атрибута
  const getDataAttribute = (
    element: HTMLElement,
    attributeArray: string[],
  ): string => {
    for (const attribute of attributeArray) {
      if (element.hasAttribute(`data-${attribute}`)) {
        return `data-${attribute}`;
      }
    }
    return "";
  };



  // Функция для получения редактируемого элемента
  const getCurrentStyles = (element: HTMLElement): CSSStyleDeclaration => {
    const dataAttributeArray = ["component", "section"];
    const dataAttribute = getDataAttribute(element, dataAttributeArray);
    switch (dataAttribute) {
      case "data-component":
        return getComponentStyles(element);
      case "data-section":
        return getSectionStyles(element);
      default:
        return {} as CSSStyleDeclaration;
    }
  };




  // Функция для получения ключа с помощью которого мы будем обновлять стили в базе данных
  const getKey = (style: string): string => {
    const dataAttributeArray = ["component", "section"];
    const hasDataAttribute = dataAttributeArray.some((attribute) =>
      element?.hasAttribute(`data-${attribute}`),
    );

    if (hasDataAttribute) {
      const dataAttribute = `data-${dataAttributeArray.find((attribute) =>
        element?.hasAttribute(`data-${attribute}`),
      )}`;

      if (dataAttribute === "data-component") {
        const a = ruleComponentStyles.find(
          (item) => Object.keys(item)[0] === style,
        );
        return a ? Object.values(a)[0] : "outerStyles";
      }

      if (dataAttribute === "data-section") {
        const a = ruleSectionStyles.find(
          (item) => Object.keys(item)[0] === style,
        );
        return a ? Object.values(a)[0] : "sectionStyles";
      }

      toast.error(
        "Data attribute not found, problem found in file update-inline-styles.ts",
      );
      return "Attribute not found";
    } else {
      toast.error(
        "Data attribute not found, problem found in file update-inline-styles.ts",
      );
      return "Attribute not found";
    }
  };


  const id = element?.getAttribute("data-id");
  if (!id) {
    toast.error(
      `Element id not found, problem found in file update-inline-styles.ts`,
    );
    return console.error(
      "Element id not found, problem found in file update-inline-styles.ts",
    );
  }

  const model = getModel();
  const key = getKey(locationStyles);
  const value = serializeInlineStyles(getCurrentStyles(element as HTMLElement));

  if (hasPrismaAttribute()) {
    const { success } = await updateElement(id, model, key, value, pathName);
    success
      ? toast.success("Database updated")
      : toast.error(
          `Database not updated, problem found in file update-inline-styles.ts`,
        );
  } else {
    toast.error(
      "Database not updated, problem found in file update-inline-styles.ts",
    );
  }
};

export { updateInlineStyles };
