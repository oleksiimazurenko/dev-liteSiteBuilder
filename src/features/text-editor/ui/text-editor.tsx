"use client";

import { useEffect, useRef } from "react";

import cn from "classnames";
import { usePopoverToolsStore } from '@/shared/store/editable-group-store'

type TextEditorProps = {
  id: string;
  tag: keyof JSX.IntrinsicElements;
  textContent: string;
  outerStyles: React.CSSProperties;
  innerStyles: React.CSSProperties;
};

export function TextEditor({
  id,
  tag,
  textContent,
  outerStyles,
  innerStyles,
}: TextEditorProps) {
  const textEditorRef = useRef<HTMLDivElement>(null);
  const Tag = tag;

  const {
    editableGroup,
    setEditableGroup,
    setIsOpenPopoverTools,
    setTypeOpen,
  } = usePopoverToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  // Когда все отрендерится, вставляем текст из базы данных
  useEffect(() => {
    if (textEditorRef.current && typeof textContent === "string") {
      textEditorRef.current.textContent = textContent;
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
    setIsOpenPopoverTools(true);

    // Сохраняем редактируемый элемент
    setEditableGroup({
      editableElement: e.target as HTMLSpanElement,
      editableTrigger: e.target as HTMLSpanElement,
    });
  };

  return (
    <Tag style={outerStyles as React.CSSProperties}>
      <span
        data-id={id}
        data-component
        data-trigger-tools
        style={innerStyles as React.CSSProperties}
        className={cn("cursor-pointer")}
        ref={textEditorRef}
        tabIndex={0}
        onClick={onHandleClick}
      />
    </Tag>
  );
}
