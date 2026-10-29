import { useSyncExternalStore } from "react";

/** `true` enquanto a consulta CSS (ex.: "(max-width: 860px)") for verdadeira. */
export function useMediaQuery(consulta: string): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => matchMedia(consulta).matches,
    () => false,
  );
}
