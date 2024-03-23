import { useEffect, useRef } from "react";

export function useDrawerHelper<T extends HTMLElement>(
  isOpen: boolean,
  callback: () => void,
): void {
  // Используем useRef для хранения ссылки на таймер, чтобы можно было его очистить
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    function handleDrawerHelper(): void {
      const vaulOverlay = document.querySelector("[vaul-overlay]");
      if (vaulOverlay) {
        const opacity = (vaulOverlay as HTMLDivElement).style.opacity;
        if (opacity === "0") {
          callback();
        }
      }
    }

    timerRef.current = window.setTimeout(() => {
      const vaulDrawer = document.querySelector("[vaul-drawer]");
      if (isOpen && vaulDrawer) {
        vaulDrawer.addEventListener("click", handleDrawerHelper);
      }
    }, 0);

    // Функция очистки для useEffect
    return () => {
      // Очистка таймера
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      // Удаление обработчика событий. Нам нужно повторно получить элемент,
      // так как он мог измениться или исчезнуть за время жизни компонента
      const vaulDrawer = document.querySelector("[vaul-drawer]");
      if (vaulDrawer) {
        vaulDrawer.removeEventListener("click", handleDrawerHelper);
      }
    };
  }, [callback, isOpen]);
}
