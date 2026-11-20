import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useI18n } from '@/i18n';
import { runCommand, COMMAND_NAMES } from '@/components/terminal/commands';

export const OPEN_TERMINAL_EVENT = 'open-terminal';

// Terminal interativo (Ctrl/Cmd + K). Os comandos ficam em commands.js; aqui só há a interface.
const TerminalDialog = () => {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]); // { command, lines }
  const [recall, setRecall] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const openerRef = useRef(null); // elemento que tinha o foco quando o terminal abriu

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openerRef.current = document.activeElement;
        setOpen((value) => !value);
      }
    };
    const onOpen = () => {
      openerRef.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_TERMINAL_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_TERMINAL_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [history, open]);

  const execute = useCallback(
    (raw) => {
      const command = raw.trim();
      if (!command) return;
      const result = runCommand(command, { t, lang });
      if (result.clear) {
        setHistory([]);
      } else {
        setHistory((items) => [...items, { command, lines: result.lines }]);
      }
      if (result.setLang) setLang(result.setLang);
      if (result.close) setOpen(false);
      setInput('');
      setRecall(-1);
    },
    [t, lang, setLang],
  );

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      execute(input);
    } else if (event.key === 'Tab') {
      // Só intercepta o Tab quando há o que completar; sem correspondência o foco segue para os botões.
      const typed = input.trim().toLowerCase();
      const match = typed ? COMMAND_NAMES.find((name) => name.startsWith(typed) && name !== typed) : null;
      if (match) {
        event.preventDefault();
        setInput(`${match} `);
      }
    } else if (event.key === 'ArrowUp' && history.length > 0) {
      event.preventDefault();
      const next = Math.min(history.length - 1, recall + 1);
      setRecall(next);
      setInput(history[history.length - 1 - next].command);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = Math.max(-1, recall - 1);
      setRecall(next);
      setInput(next === -1 ? '' : history[history.length - 1 - next].command);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const opener = openerRef.current;
            if (opener && document.contains(opener) && typeof opener.focus === 'function') opener.focus();
          }}
          className="fixed left-1/2 top-[10%] z-[100] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/60 focus:outline-none"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-black/20 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" aria-hidden="true" />
            <Dialog.Title className="ml-3 font-mono text-xs text-muted-foreground">{t.terminal.title}</Dialog.Title>
            <Dialog.Close
              aria-label={t.terminal.close}
              className="ml-auto rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{t.terminal.description}</Dialog.Description>

          <div ref={outputRef} className="max-h-[50vh] overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed" aria-live="polite">
            {history.length === 0 && <p className="text-muted-foreground">{t.terminal.welcome}</p>}
            {history.map((entry, index) => (
              <div key={index} className="mb-3">
                <p className="text-primary-text">$ {entry.command}</p>
                {entry.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="whitespace-pre-wrap text-foreground/85">
                    {line.href ? (
                      <a href={line.href} target="_blank" rel="noopener noreferrer" className="text-primary-text underline-offset-2 hover:underline">
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2">
            {COMMAND_NAMES.filter((name) => !['goto', 'lang', 'exit'].includes(name)).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => execute(name)}
                className="rounded border border-border px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground hover:border-primary hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-sm">
            <span className="text-primary-text" aria-hidden="true">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={t.terminal.inputLabel}
              placeholder="help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TerminalDialog;
