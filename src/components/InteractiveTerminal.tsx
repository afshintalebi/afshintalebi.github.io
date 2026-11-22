'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Activity, Play, Sparkles } from 'lucide-react';
import { sound } from '@/utils/audio';
import { copyText } from '@/utils/clipboard';

const tabs = [
  { id: 'go', label: 'worker_pool.go', icon: Code2, color: 'text-cyan-400' },
  { id: 'ts', label: 'cqrs_handler.ts', icon: Terminal, color: 'text-violet-400' },
  { id: 'bench', label: 'benchmark.sh', icon: Activity, color: 'text-fuchsia-400' },
  { id: 'json', label: 'profile.json', icon: Sparkles, color: 'text-emerald-400' },
];

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'go' | 'ts' | 'bench' | 'json'>('go');
  const [copied, setCopied] = useState(false);
  const [isBenchRunning, setIsBenchRunning] = useState(false);
  const [benchProgress, setBenchProgress] = useState(0);
  const [benchLogs, setBenchLogs] = useState<string[]>([
    '$ ./benchmark --target=worker_pool --concurrency=100',
    'Ready. Click [Execute Benchmark] to run live Go concurrency test.',
  ]);

  const handleCopy = async () => {
    let text = '';
    if (activeTab === 'go') text = goCode;
    else if (activeTab === 'ts') text = tsCode;
    else if (activeTab === 'json') text = jsonCode;
    else text = benchLogs.join('\n');

    if (!(await copyText(text))) return;
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runBenchmark = () => {
    if (isBenchRunning) return;
    sound.playChirp(440, 0.08);
    setIsBenchRunning(true);
    setBenchProgress(10);
    setBenchLogs(['$ ./benchmark --target=worker_pool --concurrency=100 --iterations=5000']);

    const steps = [
      { msg: '[0.012s] Spawning 16 goroutine workers on M:N Go runtime...', prog: 25 },
      { msg: '[0.038s] Allocating bounded buffer channel jobs := make(chan Job, 5000)...', prog: 45 },
      { msg: '[0.089s] Ingesting 5,000 tasks across 16 CPU threads with bounded memory...', prog: 70 },
      { msg: '[0.145s] Zero memory leak detected. GC pause: 0.18ms.', prog: 85 },
      { msg: '[0.210s] PASS: BenchmarkWorkerPool-16  5000  41,820 ns/op  0 allocs/op', prog: 95 },
      { msg: '✓ Concurrency throughput: 23,890 ops/sec (11.8x speedup over sequential)', prog: 100 },
      { msg: '[0.212s] Benchmark completed successfully with exit code 0.', prog: 100 },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        sound.playClick();
        setBenchLogs((prev) => [...prev, step.msg]);
        setBenchProgress(step.prog);
        if (index === steps.length - 1) {
          sound.playSuccess();
          setIsBenchRunning(false);
        }
      }, (index + 1) * 220);
    });
  };

  const goCode = `package concurrency

import (
    "context"
    "sync"
)

type WorkerPool struct {
    workers int
    jobs    chan Job
    results chan Result
}

func NewWorkerPool(workers int, queueSize int) *WorkerPool {
    return &WorkerPool{
        workers: workers,
        jobs:    make(chan Job, queueSize),
        results: make(chan Result, queueSize),
    }
}

// Start dispatches goroutines with context cancellation
func (wp *WorkerPool) Start(ctx context.Context) {
    var wg sync.WaitGroup
    for i := 0; i < wp.workers; i++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return
                case job, ok := <-wp.jobs:
                    if !ok {
                        return
                    }
                    wp.results <- job.Execute(workerID)
                }
            }
        }(i)
    }
    go func() {
        wg.Wait()
        close(wp.results)
    }()
}`;

  const tsCode = `@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: CreateOrderCommand): Promise<OrderResult> {
    const { customerId, items, currency } = command.payload;
    this.logger.log(\`Processing order for customer: \${customerId}\`);

    // Enforce aggregate invariants
    const order = OrderAggregate.create({ customerId, items, currency });
    await this.orderRepository.save(order);

    // Broadcast domain event to asynchronous subscribers
    this.eventBus.publish(new OrderCreatedEvent(order.id, order.totalAmount));
    return new OrderResult(order.id, 'ACCEPTED');
  }
}`;

  const jsonCode = `{
  "name": "Afshin Talebi",
  "title": "Senior Software Engineer & Systems Architect",
  "experience_years": 10,
  "core_languages": ["Go", "TypeScript", "JavaScript", "SQL"],
  "architectures": [
    "Clean Architecture & DDD",
    "CQRS (Command Query Responsibility Segregation)",
    "Go Concurrency & Worker Pools",
    "Microservices & Docker Clusters"
  ],
  "cloud": ["GCP", "Docker", "PostgreSQL", "MongoDB", "Nginx"],
  "status": "Available for High-Impact Engagements",
  "metrics": {
    "boilerplate_speedup": "85%",
    "concurrency_gain": "10x",
    "type_safety": "100%"
  }
}`;

  return (
    <div className="w-full rounded-3xl glass-cyber border border-violet-500/30 overflow-hidden font-mono text-xs sm:text-sm bg-[#080614]/95 shadow-2xl shadow-violet-950/50">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0a20] border-b border-violet-900/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-violet-900/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as 'go' | 'ts' | 'bench' | 'json');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-900/40 text-cyan-300 shadow-sm border border-violet-500/50 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-violet-900/30 transition-colors cursor-pointer"
          title="Copy contents"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Display Area */}
      <div className="p-4 sm:p-5 overflow-x-auto min-h-[320px] max-h-[420px] bg-[#05040d]/95">
        {activeTab === 'go' && (
          <pre className="text-cyan-100 leading-relaxed font-mono text-xs sm:text-[13px]">
            <code>{goCode}</code>
          </pre>
        )}

        {activeTab === 'ts' && (
          <pre className="text-violet-100 leading-relaxed font-mono text-xs sm:text-[13px]">
            <code>{tsCode}</code>
          </pre>
        )}

        {activeTab === 'json' && (
          <pre className="text-emerald-300 leading-relaxed font-mono text-xs sm:text-[13px]">
            <code>{jsonCode}</code>
          </pre>
        )}

        {activeTab === 'bench' && (
          <div className="flex flex-col justify-between h-full font-mono text-xs">
            {/* Progress bar during bench */}
            {isBenchRunning && (
              <div className="w-full bg-violet-950/60 h-1.5 rounded-full mb-3 overflow-hidden border border-violet-800/40">
                <div
                  className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 h-full transition-all duration-150"
                  style={{ width: `${benchProgress}%` }}
                />
              </div>
            )}

            <div className="space-y-1.5 mb-4">
              {benchLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.startsWith('$')
                      ? 'text-cyan-400 font-bold'
                      : log.includes('✓')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('PASS')
                      ? 'text-fuchsia-300 font-semibold'
                      : 'text-neutral-300'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-violet-900/30 flex items-center justify-between">
              <span className="text-[11px] text-violet-400">
                Simulated Go Concurrency Harness v1.24
              </span>
              <button
                onClick={runBenchmark}
                disabled={isBenchRunning}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-neutral-950 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isBenchRunning ? 'Running Bench...' : 'Execute Benchmark'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 bg-[#090716] border-t border-violet-900/30 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400">● UTF-8</span>
          <span>Tab Size: 2</span>
          <span>Target: Linux/Darwin x86_64</span>
        </div>
        <span className="text-fuchsia-300">10+ Years Systems Delivery</span>
      </div>
    </div>
  );
}
