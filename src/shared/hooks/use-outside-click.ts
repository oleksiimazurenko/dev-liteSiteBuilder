import { RefObject, useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  isOpen: boolean,
  callback: () => void,
  exception: string[],
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (exception.length > 0) {
        const isOutsideClick = !exception.some((selector) => {
          if (selector.startsWith(".")) {
            const className = selector.slice(1);
            return (event.target as HTMLElement)?.classList.contains(className);
          } else {
            if ((event.target as HTMLElement)?.closest(selector) != null) {
              return (event.target as HTMLElement)?.closest(selector) != null;
            } else if (selector.startsWith("[") && selector.endsWith("]")) {
              const attributeName = selector.slice(1, -1);
              return (event.target as HTMLElement)?.hasAttribute(attributeName);
            }
          }
        });

        if (isOutsideClick) {
          callback();
          document.removeEventListener("mouseup", handleClickOutside);
        }
      }
    }

    isOpen && document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [callback, exception, isOpen]);
}