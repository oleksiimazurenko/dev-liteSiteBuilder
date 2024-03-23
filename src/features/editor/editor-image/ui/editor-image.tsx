"use client";

import { useRef } from "react";

import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import Image from "next/image";
import cn from "classnames";

type EditorImageProps = {
  id: string;
  parenTag: keyof JSX.IntrinsicElements;
  src: string;
  alt: string;
  width: number;
  height: number;
  outerStyles: React.CSSProperties;
  innerStyles: React.CSSProperties;
};

export function EditorImage({
  id,
  parenTag,
  src,
  alt,
  width,
  height,
  outerStyles,
  innerStyles,
}: EditorImageProps) {
  const editorImageRef = useRef<HTMLImageElement>(null);
  const Tag = parenTag;

  const { editableGroup, setEditableGroup, setIsOpenDrawerTools, setTypeOpen } =
    useDrawerToolsStore();

  const { editableElement, editableTrigger } = editableGroup;

  const onHandleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // Устанавливаем тип открытия поповера
    setTypeOpen("image");

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
    <Tag style={outerStyles as React.CSSProperties}>
      <Image
        data-component
        data-trigger-tools
        data-id={id}
        className={cn("cursor-pointer")}
        style={innerStyles as React.CSSProperties}
        src={src}
        alt={alt}
        ref={editorImageRef}
        width={width}
        height={height}
        onClick={onHandleClick}
      />
    </Tag>
  );
}
