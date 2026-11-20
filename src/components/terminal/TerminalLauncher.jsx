import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { OPEN_TERMINAL_EVENT } from '@/components/terminal/events';

// O terminal (Radix Dialog + comandos) só é baixado na primeira vez que o visitante o abre (Ctrl/Cmd+K ou botão
// do hero). Depois de montado, o próprio TerminalDialog cuida dos atalhos.
const TerminalDialog = lazy(() => import('@/components/terminal/TerminalDialog'));

const TerminalLauncher = () => {
  const [mounted, setMounted] = useState(false);
  const openerRef = useRef(null); // quem tinha o foco, para devolvê-lo ao fechar

  useEffect(() => {
    if (mounted) return undefined;
    const open = () => {
      openerRef.current = document.activeElement;
      setMounted(true);
    };
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_TERMINAL_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_TERMINAL_EVENT, open);
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <TerminalDialog defaultOpen initialOpener={openerRef.current} />
    </Suspense>
  );
};

export default TerminalLauncher;
