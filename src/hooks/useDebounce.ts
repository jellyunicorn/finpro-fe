import { useEffect, useState } from "react";

/**
 * Debounce a value - berguna buat search input.
 * Contoh: user ngetik cepat, API cuma call setelah 500ms berhenti.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
