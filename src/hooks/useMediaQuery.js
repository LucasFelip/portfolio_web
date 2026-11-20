import { useCallback, useSyncExternalStore } from 'react';

// true quando a media query combina; acompanha mudanças (rotação, redimensionamento).
// No servidor e na hidratação vale false (igual ao HTML pré-gerado); depois o navegador atualiza.
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
