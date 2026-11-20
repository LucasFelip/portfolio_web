import React, { useEffect, useReducer } from 'react';
import { Send, Plus, Minus, Power, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

// Simulação didática de um tópico Kafka: 3 partições, fator de replicação 2, 3 brokers e um grupo de consumidores.
// Não é uma implementação real; mostra os conceitos (partição por chave, consumo em grupo, rebalanceamento e
// eleição de líder quando um broker cai).
const BROKERS = 3;
const PARTITIONS = 3;
const REPLICAS = [[0, 1], [1, 2], [2, 0]]; // réplicas de cada partição; o primeiro vivo é o líder
const VISIBLE_MESSAGES = 12;
const MAX_LOG = 6;
const TICK_MS = 900;
const AUTO_MS = 1300;

const leaderOf = (partition, brokers) => REPLICAS[partition].find((broker) => brokers[broker]) ?? null;

const initialState = {
  brokers: Array.from({ length: BROKERS }, () => true),
  messages: Array.from({ length: PARTITIONS }, () => []),
  committed: Array.from({ length: PARTITIONS }, () => 0),
  consumers: 2,
  nextId: 1,
  logId: 1,
  log: [],
};

const addLog = (state, entry) => ({
  ...state,
  logId: state.logId + 1,
  log: [{ id: state.logId, ...entry }, ...state.log].slice(0, MAX_LOG),
});

function reducer(state, action) {
  switch (action.type) {
    case 'produce': {
      const partition = action.key % PARTITIONS;
      if (leaderOf(partition, state.brokers) === null) {
        return addLog(state, { kind: 'noLeader', partition, key: action.key });
      }
      const messages = state.messages.map((list, index) =>
        index === partition ? [...list, { id: state.nextId, key: action.key }] : list,
      );
      return addLog({ ...state, messages, nextId: state.nextId + 1 }, { kind: 'produced', partition, key: action.key });
    }
    case 'tick': {
      // Cada consumidor processa no máximo 1 mensagem por tick, da partição sua com maior lag (e líder disponível).
      const committed = [...state.committed];
      let changed = false;
      for (let consumer = 0; consumer < state.consumers; consumer += 1) {
        let best = -1;
        let bestLag = 0;
        for (let partition = consumer; partition < PARTITIONS; partition += state.consumers) {
          const lag = state.messages[partition].length - committed[partition];
          if (leaderOf(partition, state.brokers) !== null && lag > bestLag) {
            best = partition;
            bestLag = lag;
          }
        }
        if (best >= 0) {
          committed[best] += 1;
          changed = true;
        }
      }
      return changed ? { ...state, committed } : state;
    }
    case 'toggleBroker': {
      const brokers = state.brokers.map((alive, index) => (index === action.broker ? !alive : alive));
      let next = { ...state, brokers };
      if (!brokers[action.broker]) {
        next = addLog(next, { kind: 'brokerDown', broker: action.broker });
        for (let partition = 0; partition < PARTITIONS; partition += 1) {
          const before = leaderOf(partition, state.brokers);
          const after = leaderOf(partition, brokers);
          if (before === action.broker) {
            next = addLog(next, after === null ? { kind: 'offline', partition } : { kind: 'elected', partition, broker: after });
          }
        }
        return next;
      }
      next = addLog(next, { kind: 'brokerUp', broker: action.broker });
      for (let partition = 0; partition < PARTITIONS; partition += 1) {
        const before = leaderOf(partition, state.brokers);
        const after = leaderOf(partition, brokers);
        if (before !== after && after !== null) {
          next = addLog(next, { kind: 'elected', partition, broker: after });
        }
      }
      return next;
    }
    case 'setConsumers': {
      const consumers = Math.min(PARTITIONS, Math.max(1, action.count));
      if (consumers === state.consumers) return state;
      return addLog({ ...state, consumers }, { kind: 'rebalance', count: consumers });
    }
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const KafkaPlayground = () => {
  const { t } = useI18n();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [auto, setAuto] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    const id = window.setInterval(() => dispatch({ type: 'tick' }), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!auto) return undefined;
    const id = window.setInterval(() => {
      setCounter((value) => value + 1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  // Mensagem automática: a chave vem do contador, o que espalha as mensagens pelas partições.
  useEffect(() => {
    if (counter > 0) dispatch({ type: 'produce', key: counter * 7 + 3 });
  }, [counter]);

  const send = () => dispatch({ type: 'produce', key: Math.floor(Math.random() * 90) + 10 });
  const sim = t.sim;

  return (
      <div className="dashboard-card">
        <p className="font-mono text-xs text-muted-foreground mb-4">$ kafka-topics --describe --topic pedidos</p>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {state.brokers.map((alive, broker) => (
            <button
              key={broker}
              type="button"
              onClick={() => dispatch({ type: 'toggleBroker', broker })}
              aria-pressed={!alive}
              aria-label={`${sim.broker} ${broker + 1}: ${alive ? sim.killBroker : sim.reviveBroker}`}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                alive ? 'border-primary/40 text-foreground hover:border-primary' : 'border-destructive/50 text-destructive hover:border-destructive'
              }`}
            >
              <Power aria-hidden="true" className="h-3.5 w-3.5" />
              {sim.broker} {broker + 1} · {alive ? sim.up : sim.down}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[12rem_1fr_14rem]">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-primary-text">{sim.producer}</p>
            <Button size="sm" onClick={send}>
              <Send aria-hidden="true" className="w-4 h-4 mr-2" /> {sim.send}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setAuto((value) => !value)} aria-pressed={auto}>
              {auto ? <Pause aria-hidden="true" className="w-4 h-4 mr-2" /> : <Play aria-hidden="true" className="w-4 h-4 mr-2" />}
              {auto ? sim.autoOff : sim.autoOn}
            </Button>
            <p className="text-xs text-muted-foreground">{sim.keyHint}</p>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-primary-text mb-3">{sim.partitions}</p>
            <ul className="space-y-3">
              {state.messages.map((list, partition) => {
                const leader = leaderOf(partition, state.brokers);
                const offset = state.committed[partition];
                const lag = list.length - offset;
                const start = Math.max(0, list.length - VISIBLE_MESSAGES);
                return (
                  <li key={partition} className="rounded-md border border-border bg-black/20 p-3">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-foreground">P{partition}</span>
                      <span className={leader === null ? 'text-destructive' : 'text-muted-foreground'}>
                        {leader === null ? sim.noLeader : `${sim.leader}: ${sim.broker} ${leader + 1}`}
                      </span>
                      <span className="text-muted-foreground">
                        offset {offset} · lag {lag}
                      </span>
                    </div>
                    <div className="flex min-h-[1.5rem] flex-wrap gap-1" aria-hidden="true">
                      {start > 0 && <span className="font-mono text-xs text-muted-foreground">…</span>}
                      {list.slice(start).map((message, index) => {
                        const consumed = start + index < offset;
                        return (
                          <span
                            key={message.id}
                            title={`key ${message.key}`}
                            className={`flex h-6 min-w-[1.5rem] items-center justify-center rounded-sm px-1 font-mono text-[0.6rem] ${
                              consumed ? 'bg-primary/70 text-primary-foreground' : 'border border-primary-text text-primary-text'
                            }`}
                          >
                            {message.key}
                          </span>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[0.7rem] uppercase tracking-wide text-primary-text">{sim.consumers}</p>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="outline" className="h-7 w-7" aria-label={sim.removeConsumer} onClick={() => dispatch({ type: 'setConsumers', count: state.consumers - 1 })}>
                  <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="outline" className="h-7 w-7" aria-label={sim.addConsumer} onClick={() => dispatch({ type: 'setConsumers', count: state.consumers + 1 })}>
                  <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <ul className="space-y-2">
              {Array.from({ length: state.consumers }, (_, consumer) => {
                const owned = Array.from({ length: PARTITIONS }, (_, p) => p).filter((p) => p % state.consumers === consumer);
                return (
                  <li key={consumer} className="rounded-md border border-border bg-black/20 p-3 font-mono text-xs">
                    <span className="text-foreground">C{consumer + 1}</span>
                    <span className="text-muted-foreground"> → {owned.map((p) => `P${p}`).join(', ')}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-border bg-black/20 p-3" aria-live="polite">
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">{sim.eventLog}</p>
          {state.log.length === 0 ? (
            <p className="text-xs text-muted-foreground">{sim.emptyLog}</p>
          ) : (
            <ul className="space-y-1 font-mono text-xs text-foreground/80">
              {state.log.map((entry) => (
                <li key={entry.id}>› {sim.log[entry.kind](entry)}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground max-w-xl">{sim.disclaimer}</p>
          <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'reset' })}>
            {sim.reset}
          </Button>
        </div>
      </div>
  );
};

export default KafkaPlayground;
