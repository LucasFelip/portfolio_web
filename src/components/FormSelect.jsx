import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const fieldClass =
  'flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-left text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring';

// Select próprio no visual do site (a lista do <select> nativo é desenhada pelo navegador e não aceita estilo).
// Padrão ARIA de listbox: abre com clique, Enter, Espaço ou setas; setas/Home/End movem; Enter/Espaço escolhem;
// Esc e Tab fecham; digitar uma letra salta para a opção que começa com ela. O rótulo (<label htmlFor={id}>) aponta
// para o botão. O valor vai para o formulário (e para o Netlify Forms) por um <input name> invisível, que também
// faz valer o `required` com a mensagem nativa do navegador.
const FormSelect = ({ id, name, options, placeholder, required = false }) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const buttonRef = useRef(null);
  const listId = `${id}-list`;
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  const openList = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    // abre para cima quando não há espaço embaixo (e há em cima)
    setDropUp(window.innerHeight - rect.bottom < 240 && rect.top > 240);
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (index) => {
    setValue(options[index].value);
    setOpen(false);
  };

  // fecha ao clicar fora
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  // mantém a opção ativa visível na lista
  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onKeyDown = (event) => {
    const last = options.length - 1;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!open) return openList();
        const step = event.key === 'ArrowDown' ? 1 : -1;
        return setActive((current) => Math.min(last, Math.max(0, current + step)));
      }
      case 'Home':
      case 'End':
        if (!open) return undefined;
        event.preventDefault();
        return setActive(event.key === 'Home' ? 0 : last);
      case 'Enter':
      case ' ':
        event.preventDefault();
        return open ? choose(active) : openList();
      case 'Escape':
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        return undefined;
      case 'Tab':
        return setOpen(false);
      default: {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return undefined;
        const letter = event.key.toLowerCase();
        const from = open ? active + 1 : selectedIndex + 1;
        const ordered = [...options.keys()].map((_, offset) => (from + offset) % options.length);
        const match = ordered.find((index) => options[index].label.toLowerCase().startsWith(letter));
        if (match === undefined) return undefined;
        if (open) return setActive(match);
        return setValue(options[match].value);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={fieldClass}
      >
        <span className={selected ? 'truncate' : 'truncate text-muted-foreground'}>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className={`absolute left-0 right-0 z-30 max-h-60 overflow-auto rounded-md border border-border bg-card p-1 shadow-xl shadow-black/50 ${
            dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
              className={`flex cursor-pointer items-center justify-between gap-2 rounded px-3 py-2 text-sm ${
                index === active ? 'bg-primary/15 text-foreground' : 'text-foreground/85'
              } ${option.value === value ? 'text-primary-text' : ''}`}
            >
              {option.label}
              {option.value === value && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
            </li>
          ))}
        </ul>
      )}

      <input
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
};

export default FormSelect;
