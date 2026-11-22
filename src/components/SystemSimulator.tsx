'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Cpu,
  Play,
  RotateCcw,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { sound } from '@/utils/audio';

export default function SystemSimulator() {
  const [activeTab, setActiveTab] = useState<'go-pool' | 'cqrs'>('go-pool');

  // Go Concurrency Simulation State
  const [workerCount, setWorkerCount] = useState<number>(6);
  const [taskCount, setTaskCount] = useState<number>(48);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [processedTasks, setProcessedTasks] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [activeWorkerCount, setActiveWorkerCount] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const taskIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (taskIntervalRef.current) clearInterval(taskIntervalRef.current);
    timerRef.current = null;
    taskIntervalRef.current = null;
  };

  // Stop any running simulation on unmount
  useEffect(() => clearTimers, []);

  // Handle Go worker pool simulation execution
  const startSimulation = (mode: 'concurrent' | 'sequential') => {
    if (isRunning) return;
    sound.playChirp(580, 0.06);
    setIsRunning(true);
    setIsFinished(false);
    setProcessedTasks(0);
    setElapsedTime(0);

    const workersToRun = mode === 'sequential' ? 1 : workerCount;
    const startTime = Date.now();
    const taskDelay = mode === 'sequential' ? 35 : 28;
    let completed = 0;

    // Time ticker
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 30);

    // Simulated task consumer
    taskIntervalRef.current = setInterval(() => {
      completed += workersToRun;
      if (completed >= taskCount) {
        completed = taskCount;
        setProcessedTasks(taskCount);
        setIsRunning(false);
        setIsFinished(true);
        setActiveWorkerCount(0);
        sound.playSuccess();
        clearTimers();
      } else {
        setProcessedTasks(completed);
        setActiveWorkerCount(workersToRun);
      }
    }, taskDelay);
  };

  const resetSimulation = () => {
    sound.playClick();
    setIsRunning(false);
    setIsFinished(false);
    setProcessedTasks(0);
    setElapsedTime(0);
    setActiveWorkerCount(0);
    clearTimers();
  };

  // CQRS Interactive Step State
  const [cqrsStep, setCqrsStep] = useState<number>(0);
  const cqrsSteps = [
    {
      id: 'dto',
      title: '1. Inbound Request & DTO Validation',
      desc: 'Client sends JSON. Strict TypeScript DTO + class-validator pipes ensure schema integrity before entering domain logic.',
      tag: 'NestJS Pipe',
      color: 'border-cyan-500/50 text-cyan-400',
    },
    {
      id: 'command',
      title: '2. Command Bus Dispatch',
      desc: 'Controller instantiates CreateOrderCommand and dispatches via in-memory CommandBus, cleanly decoupling write operations.',
      tag: 'CQRS CommandBus',
      color: 'border-violet-500/50 text-violet-400',
    },
    {
      id: 'handler',
      title: '3. Domain Handler & ACID Persistence',
      desc: 'CreateOrderHandler executes business logic, invokes aggregate root invariants, and commits record atomically to PostgreSQL.',
      tag: 'PostgreSQL Store',
      color: 'border-fuchsia-500/50 text-fuchsia-400',
    },
    {
      id: 'event',
      title: '4. EventBus Publication & Async Projections',
      desc: 'OrderCreatedEvent is broadcast. Subscribers update read-optimized MongoDB caches and trigger background notifications.',
      tag: 'EventBus & Read Model',
      color: 'border-emerald-500/50 text-emerald-400',
    },
  ];

  return (
    <section id="simulator" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-violet-600/15 via-fuchsia-600/10 to-cyan-500/15 blur-[140px] -z-10 pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Engineering Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            System Design &amp; Concurrency Engine.
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Live interactive simulations showcasing architectural decisions: from Go goroutine worker pools with bounded channels to CQRS event segregation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 bg-[#0b081c] p-1.5 rounded-2xl border border-violet-900/40">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('go-pool');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === 'go-pool'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/20 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-300" />
            <span>Go Worker Pool</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('cqrs');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === 'cqrs'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-fuchsia-300" />
            <span>CQRS Pipeline</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Panel */}
      <div className="glass-cyber rounded-3xl border border-violet-500/30 bg-[#0a081a]/85 overflow-hidden shadow-2xl shadow-violet-950/60">
        {activeTab === 'go-pool' ? (
          <div className="p-6 sm:p-8">
            {/* Simulation Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-violet-900/30">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>runtime.NumGoroutine() Simulation</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Concurrent Worker Pool vs Sequential Baseline
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                  Demonstrating bounded channel task distribution in Go. Adjust the goroutine pool size and task backlog to observe real-time throughput scaling.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => startSimulation('concurrent')}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-neutral-950 shadow-lg shadow-violet-500/25 disabled:opacity-50 transition-all cursor-pointer hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Go Worker Pool ({workerCount}x)</span>
                </button>
                <button
                  onClick={() => startSimulation('sequential')}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono bg-violet-950/40 hover:bg-violet-900/40 text-neutral-300 border border-violet-500/30 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Sequential (1x)</span>
                </button>
                <button
                  onClick={resetSimulation}
                  disabled={isRunning}
                  className="p-2.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/40 text-neutral-400 hover:text-white border border-violet-500/30 disabled:opacity-50 transition-colors cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Config Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-violet-900/30 font-mono text-xs">
              <div>
                <div className="flex justify-between items-center text-neutral-300 mb-2">
                  <span>Goroutine Workers: <span className="text-cyan-400 font-bold">{workerCount}</span></span>
                  <span className="text-[10px] text-neutral-500">sync.WaitGroup &bull; Bounded</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  disabled={isRunning}
                  value={workerCount}
                  onChange={(e) => {
                    sound.playClick();
                    setWorkerCount(Number(e.target.value));
                  }}
                  className="w-full accent-cyan-400 bg-violet-950/60 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-neutral-300 mb-2">
                  <span>Job Backlog Queue: <span className="text-fuchsia-400 font-bold">{taskCount}</span> Tasks</span>
                  <span className="text-[10px] text-neutral-500">jobs := make(chan Task, {taskCount})</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="96"
                  step="12"
                  disabled={isRunning}
                  value={taskCount}
                  onChange={(e) => {
                    sound.playClick();
                    setTaskCount(Number(e.target.value));
                  }}
                  className="w-full accent-fuchsia-500 bg-violet-950/60 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-900/40 font-mono">
                <div className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Queue Progress</div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline gap-1">
                  <span>{processedTasks}</span>
                  <span className="text-xs text-neutral-500">/ {taskCount}</span>
                </div>
                <div className="w-full bg-violet-950 h-2 rounded-full mt-2 overflow-hidden border border-violet-900/50">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 h-full transition-all duration-75"
                    style={{ width: `${(processedTasks / taskCount) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-900/40 font-mono">
                <div className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Wall Clock Time</div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                  {elapsedTime} <span className="text-xs font-normal text-neutral-400">ms</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-2">
                  {isRunning ? 'Processing...' : isFinished ? 'Completed' : 'Standby'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-900/40 font-mono">
                <div className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Throughput Rate</div>
                <div className="text-xl sm:text-2xl font-bold text-fuchsia-400">
                  {elapsedTime > 0 ? ((processedTasks / elapsedTime) * 1000).toFixed(1) : '0.0'}{' '}
                  <span className="text-xs font-normal text-neutral-400">tasks/s</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-2">Zero GC Stall</div>
              </div>

              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-900/40 font-mono">
                <div className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Concurrency Gain</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                  {isFinished ? `${(workerCount * 0.88).toFixed(1)}x` : `${workerCount}x Pot.`}
                </div>
                <div className="text-[10px] text-neutral-400 mt-2">Worker Pool Saturation</div>
              </div>
            </div>

            {/* Visual Goroutine Worker Slots */}
            <div className="mt-2">
              <div className="text-xs font-mono text-neutral-400 mb-3 flex items-center justify-between">
                <span>Active Goroutine Worker Instances:</span>
                <span className="text-[11px] text-cyan-400">Go M:N Scheduler (GOMAXPROCS)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Array.from({ length: workerCount }).map((_, idx) => {
                  const isActive = idx < activeWorkerCount;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border font-mono text-xs transition-all ${
                        isActive
                          ? 'bg-cyan-950/60 border-cyan-400/80 shadow-lg shadow-cyan-500/20 text-cyan-200 scale-102'
                          : isFinished
                          ? 'bg-violet-950/30 border-violet-900/40 text-neutral-400'
                          : 'bg-[#06040f] border-violet-950 text-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase text-neutral-400">Worker #{idx + 1}</span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isActive ? 'bg-cyan-400 animate-ping' : isFinished ? 'bg-violet-600' : 'bg-neutral-800'
                          }`}
                        />
                      </div>
                      <div className="font-semibold text-xs truncate">
                        {isActive ? 'Processing Job' : isFinished ? 'Idle (Done)' : 'Listening...'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* CQRS Pipeline Interactive Step Walkthrough */
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-violet-900/30">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  <span>NestJS &bull; Event-Driven Architecture</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  CQRS Command &amp; Query Pipeline Visualizer
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                  Step through how an enterprise mutation command flows cleanly from HTTP ingress to transactional write and asynchronous read model projection.
                </p>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setCqrsStep((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={cqrsStep === 0}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-violet-950/40 border border-violet-900/40 text-neutral-300 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs font-mono text-cyan-300 px-2">
                  Step {cqrsStep + 1} / {cqrsSteps.length}
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setCqrsStep((prev) => Math.min(cqrsSteps.length - 1, prev + 1));
                  }}
                  disabled={cqrsStep === cqrsSteps.length - 1}
                  className="px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:opacity-40 cursor-pointer shadow-md shadow-violet-500/20"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Visual Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8">
              {cqrsSteps.map((step, idx) => {
                const isCurrent = cqrsStep === idx;
                const isPassed = cqrsStep > idx;
                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      sound.playClick();
                      setCqrsStep(idx);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isCurrent
                        ? `bg-violet-950/70 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-102`
                        : isPassed
                        ? 'bg-violet-950/30 border-emerald-500/40 opacity-80'
                        : 'bg-black/40 border-violet-950/50 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-neutral-300 border border-violet-900/40">
                        {step.tag}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {isCurrent && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Architecture Code Preview for Current Step */}
            <div className="rounded-2xl bg-[#060410] border border-violet-900/40 p-4 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-violet-900/30 text-neutral-400 text-[11px]">
                <span>Pattern Spec: {cqrsSteps[cqrsStep].title}</span>
                <span className="text-cyan-400">Zero Cyclic Dependencies</span>
              </div>
              <pre className="text-violet-100">
                {cqrsStep === 0 &&
                  `@Post('orders')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
async create(@Body() dto: CreateOrderDto) {
  return this.commandBus.execute(new CreateOrderCommand(dto));
}`}
                {cqrsStep === 1 &&
                  `export class CreateOrderCommand implements ICommand {
  constructor(public readonly payload: CreateOrderDto) {}
}
// CommandBus routes command to single handler without coupling.`}
                {cqrsStep === 2 &&
                  `@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  async execute(cmd: CreateOrderCommand): Promise<string> {
    const order = await this.repo.save(new Order(cmd.payload));
    this.eventBus.publish(new OrderCreatedEvent(order.id));
    return order.id;
  }
}`}
                {cqrsStep === 3 &&
                  `@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    // 1. Update read-optimized MongoDB collection
    // 2. Dispatch Push Notification via Firebase
    // 3. Emit metrics to GCP Cloud Monitoring
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
