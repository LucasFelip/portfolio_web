import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';
import { pt } from '@/i18n/pt';

// Formulário de orçamento via Netlify Forms: o Netlify detecta o formulário no HTML gerado no build
// (data-netlify) e recebe o envio por POST em "/". Sem back-end próprio. O valor enviado é sempre em português
// (pt.quote), para as respostas ficarem padronizadas independentemente do idioma da tela.
const FORM_NAME = 'orcamento';

const inputClass =
  'w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

const Field = ({ id, label, optionalLabel, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block font-mono text-xs text-muted-foreground">
      {label} {optionalLabel && <span className="text-muted-foreground/60">{optionalLabel}</span>}
    </label>
    {children}
  </div>
);

const Select = ({ id, name, label, optionalLabel, placeholder, values, labels, required }) => (
  <Field id={id} label={label} optionalLabel={optionalLabel}>
    <select id={id} name={name} required={required} defaultValue="" className={inputClass}>
      <option value="" disabled>
        {placeholder}
      </option>
      {values.map((value, index) => (
        <option key={value} value={value}>
          {labels[index]}
        </option>
      ))}
    </select>
  </Field>
);

const QuoteForm = () => {
  const { t, lang } = useI18n();
  const q = t.quote;
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-primary/30 bg-primary/10 p-6 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto mb-3 h-8 w-8 text-primary-text" />
        <p className="text-lg font-semibold text-foreground">{q.successTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{q.success}</p>
        <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setStatus('idle')}>
          {q.another}
        </Button>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="idioma" value={lang} />
      <p className="hidden">
        <label>
          Não preencha: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Field id="quote-name" label={q.name}>
        <input id="quote-name" name="nome" type="text" required autoComplete="name" maxLength={120} className={inputClass} />
      </Field>
      <Field id="quote-email" label={q.email}>
        <input id="quote-email" name="email" type="email" required autoComplete="email" maxLength={160} className={inputClass} />
      </Field>
      <Select
        id="quote-type"
        name="tipo_de_projeto"
        label={q.projectType}
        placeholder={q.select}
        values={pt.quote.projectTypes}
        labels={q.projectTypes}
        required
      />
      <Select
        id="quote-timeline"
        name="prazo"
        label={q.timeline}
        optionalLabel={q.optional}
        placeholder={q.select}
        values={pt.quote.timelines}
        labels={q.timelines}
      />
      <div className="sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]">
        <Select
          id="quote-budget"
          name="orcamento_aproximado"
          label={q.budget}
          optionalLabel={q.optional}
          placeholder={q.select}
          values={pt.quote.budgets}
          labels={q.budgets}
        />
      </div>
      <div className="sm:col-span-2">
        <Field id="quote-message" label={q.message}>
          <textarea id="quote-message" name="mensagem" required rows={4} maxLength={2000} className={`${inputClass} resize-y`} />
        </Field>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{q.privacy}</p>
        <Button type="submit" disabled={status === 'sending'} className="sm:w-auto">
          {status === 'sending' ? q.sending : q.submit} <Send aria-hidden="true" className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-300 sm:col-span-2">
          {q.error}
        </p>
      )}
    </form>
  );
};

export default QuoteForm;
