import { useEffect, useState } from "react";

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Вызовите обработчик сразу же при инициализации

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export { useWindowSize };
