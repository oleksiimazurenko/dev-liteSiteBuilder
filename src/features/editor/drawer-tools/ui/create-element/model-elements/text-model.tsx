"use client";

import { createElement } from "@/shared/actions/element/set/create-element";
import { text } from "@/shared/styles/initial/style-component";
import { Type } from "lucide-react";
import { usePathname } from "next/navigation";

type TextElementProps = {
  id: string;
};

export function TextModel({ id }: TextElementProps) {
  const pathName = usePathname();

  const onHandleClick = () => {
    createElement({
      id,
      type: "text",
      textContent: "Default text",
      outerStyles: text.outerStyles,
      innerStyles: text.innerStyles,
      parenTag: "div",
      rPath: pathName,
      width: null,
      height: null,
      src: null,
      alt: null,
      href: null,
    });
  };

  return (
    <button
      className="toggle-popover"
      aria-label="Padding"
      onClick={() => onHandleClick()}
    >
      <Type className="svg-icon-stroke" strokeWidth={0.75} />
    </button>
  );
}
