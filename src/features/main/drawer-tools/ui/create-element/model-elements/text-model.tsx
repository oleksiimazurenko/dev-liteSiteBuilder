"use client";

import { createElement } from "@/shared/actions/element/set/create-element";
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
      outerStyles: {},
      innerStyles: {
        marginTop: "20px",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.75)",
        fontSize: "1.25rem",
        color: "#f8fafc",
        textAlign: "center",
      },
      tag: "div",
      rPath: pathName,
      width: null,
      height: null,
      src: null,
      alt: null,
      href: null,
    });
  };

  return (
    <>
      <button
        className="toggle-popover"
        aria-label="Padding"
        onClick={() => onHandleClick()}
      >
        <Type strokeWidth={0.75} />
      </button>
    </>
  );
}
