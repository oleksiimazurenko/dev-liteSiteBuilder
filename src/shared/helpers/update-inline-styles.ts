import { toast } from "sonner";
import { updateElement } from "../actions/element/set/update-element";

const modelsPrismaArray = ["component", "section"];

const ruleComponentStyles = [
  { widthAndHeight: "outerStyles" },
  { textAlign: "outerStyles" },
  { padding: "innerStyles" },
  { margin: "outerStyles" },
  { rounded: "innerStyles" },
  { background: "innerStyles" },
  { textDecoration: "innerStyles" },
  { color: "innerStyles" },
  { fontSize: "innerStyles" },
  { textStroke: "innerStyles" },
];

const ruleSectionStyles = [
  { padding: "sectionStyles" },
  { rounded: "sectionStyles" },
  { background: "sectionStyles" },
];

const updateInlineStyles = async (
  element: HTMLElement | SVGSVGElement,
  pathName: string,
  style: string,
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

  // Функция для преобразования стилей kebab-case в camelCase
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

  const getComponentStyles = (element: HTMLElement): CSSStyleDeclaration => {
    const object = ruleComponentStyles.find(
      (item) => Object.keys(item)[0] === style,
    );
    const isOuterStyles = object
      ? Object.values(object)[0] === "outerStyles"
      : true;
    return isOuterStyles
      ? (element.parentElement as HTMLElement).style
      : element.style;
  };

  const getSectionStyles = (element: HTMLElement): CSSStyleDeclaration => {
    const object = ruleSectionStyles.find(
      (item) => Object.keys(item)[0] === style,
    );
    const isSectionStyles = object
      ? Object.values(object)[0] === "sectionStyles"
      : true;
    return isSectionStyles
      ? element.style
      : (element.firstChild as HTMLElement).style;
  };

  // Функция для получения ключа с помощью которого мы будем обновлять стили в базе данных
  const getKey = (style: string): string => {
    const dataAttribureArray = ["component", "section"];
    const hasDataAttribute = dataAttribureArray.some((attribute) =>
      element?.hasAttribute(`data-${attribute}`),
    );

    if (hasDataAttribute) {
      const dataAttribute = `data-${dataAttribureArray.find((attribute) =>
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
  const key = getKey(style);
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
