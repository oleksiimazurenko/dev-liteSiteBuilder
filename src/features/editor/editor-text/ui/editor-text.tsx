"use client";

import { useEffect, useRef } from "react";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import cn from "classnames";

type EditorTextProps = {
  id: string;
  parentTag: keyof JSX.IntrinsicElements;
  textContent: string;
  outerStyles: React.CSSProperties;
  middleStyles: React.CSSProperties;
  innerStyles: React.CSSProperties;
};

export function EditorText({
  id,
  parentTag,
  textContent,
  outerStyles,
  middleStyles,
  innerStyles,
}: EditorTextProps) {
  const editorTextRef = useRef<HTMLDivElement>(null);
  const Tag = parentTag;

  const { editableGroup, setEditableGroup, setIsOpenDrawerTools, setTypeOpen } =
    useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  // Когда все отрендерится, вставляем текст из базы данных
  useEffect(() => {
    if (editorTextRef.current && typeof textContent === "string") {
      editorTextRef.current.textContent = textContent;
    }
  }, [textContent]);

  const onHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // Устанавливаем тип открытия поповера
    setTypeOpen("text");

    // Убираем outline c предыдущего элемента
    if (editableElement) {
      (editableElement as HTMLElement)?.style.setProperty("outline", "none");
    }

    // Открываем поповер
    setIsOpenDrawerTools(true);

    // Сохраняем редактируемый элемент
    setEditableGroup({
      editableElement: e.target as HTMLSpanElement,
      editableTrigger: e.target as HTMLSpanElement,
    });
  };

  return (
    <Tag data-outer style={outerStyles as React.CSSProperties}>
      <div data-middle style={middleStyles as React.CSSProperties}>
        <span
          data-id={id}
          data-inner
          data-component
          data-trigger-tools
          style={innerStyles as React.CSSProperties}
          className={cn("cursor-pointer")}
          ref={editorTextRef}
          onClick={onHandleClick}
          tabIndex={0}
        />
      </div>
    </Tag>
  );
}
