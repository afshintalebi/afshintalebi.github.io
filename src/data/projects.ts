import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'nestjs-code-generator',
    title: 'NestJS AI Architecture Generator CLI',
    subtitle: 'Automated Module & CQRS Codebase Synthesizer',
    category: 'ai',
    accentColor: '#a855f7', // Electric Violet
    role: 'Creator & Backend Architect',
    impact: 'Reduces enterprise boilerplate setup by 85% through AST-driven deterministic code generation from natural language.',
    description:
      'An intelligent developer CLI tool that transforms conversational prompts into production-ready NestJS enterprise module architectures. Instead of manually scaffolding schemas, DTOs, CQRS commands, handlers, and unit tests, developers describe domain requirements in natural language to receive clean, strictly-typed code compliant with enterprise patterns.',
    technologies: ['NestJS', 'Node.js', 'TypeScript', 'OpenAI API', 'CLI Engine', 'CQRS', 'AST Parsing', 'Jest'],
    features: [
      'Synthesizes full NestJS module scaffolding: Controllers, Services, DTOs, Schemas, CQRS commands & handlers',
      'Strict TypeScript typing, validation pipes, and class-validator decorator generation',
      'Deterministic file-tree creation matching clean architecture standards with zero cyclic dependencies',
      'Interactive CLI terminal mode with configurable architectural presets and custom templates',
    ],
    architecture: 'Clean Architecture with Command Query Responsibility Segregation (CQRS)',
    architectureSummary:
      'Client Prompt -> NLP Semantic Parser -> Schema & AST Synthesis Engine -> TypeScript AST Formatter -> Deterministic File Emitter & Test Generator',
    challenges: [
      'Eliminating LLM hallucination in complex imports by grounding code synthesis with TypeScript AST validation',
      'Enforcing strict CQRS separation between read queries and mutate commands at generation time',
      'Ensuring generated code passes strict ESLint and TypeScript compilation without manual fixes',
    ],
    benchmarks: [
      { label: 'Scaffolding Time', before: '4.5 hours', after: '40 seconds', delta: '-85%' },
      { label: 'Type Safety Score', before: 'Manual checks', after: '100% strict TS', delta: 'Zero type errors' },
      { label: 'Code Uniformity', before: 'Team dependent', after: '100% standardized', delta: 'Deterministic' },
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'generate-cqrs.command.ts',
      code: `@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateOrderCommand): Promise<OrderResult> {
    const { customerId, items } = command;
    const order = Order.create({ customerId, items });
    await this.orderRepository.save(order);
    this.eventBus.publish(new OrderCreatedEvent(order.id));
    return new OrderResult(order.id, 'ACCEPTED');
  }
}`,
    },
    metrics: [
      { label: 'Boilerplate Speedup', value: '85%' },
      { label: 'Architecture', value: 'Clean CQRS' },
      { label: 'Type Safety', value: '100% Strict' },
    ],
    githubUrl: 'https://github.com/afshintalebi/nestjs-ai',
    featured: true,
  },
  {
    id: 'ai-translator',
    title: 'Multimodal AI Translation Suite',
    subtitle: 'Next.js & OpenAI Powered Multimodal Translator',
    category: 'ai',
    accentColor: '#ec4899', // Radiant Pink / Fuchsia
    role: 'Lead Full-Stack Developer & AI Integrator',
    impact: 'Enables real-time cross-language translation across text, recorded voice, uploaded audio, image OCR, and multi-page documents.',
    description:
      'A comprehensive multimodal translation suite built on Next.js 15, integrating OpenAI GPT-4o vision and Whisper models. Designed for complex translation workflows that require cross-referencing audio speech, photographic text extraction, and multi-page document parsing while preserving domain-specific terminology.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'OpenAI API', 'Whisper', 'Tailwind CSS', 'Web Audio API'],
    features: [
      'Multimodal input: Text, live microphone voice recording, audio file uploads, and image OCR',
      'Whisper API integration for automatic language detection and high-fidelity transcription',
      'Streaming responses with real-time markdown and syntax rendering over Server-Sent Events',
      'Context-aware translations preserving domain terminology and formal registers',
    ],
    architecture: 'Event-driven streaming pipeline with client-side audio chunking and SSE token stream',
    architectureSummary:
      'Microphone/File -> Web Audio API (PCM Buffer) -> Whisper STT API -> Prompt Context Engine -> GPT-4o Streaming -> Real-time UI Hydration',
    challenges: [
      'Handling high-latency audio processing by streaming intermediate speech recognition chunks',
      'Preventing audio buffer overflow on low-memory mobile browser environments',
      'Preserving formatting and markdown hierarchy during real-time streaming translations',
    ],
    benchmarks: [
      { label: 'Translation Latency', before: '3200ms', after: '840ms', delta: '-73%' },
      { label: 'Modality Coverage', before: 'Text only', after: '5 Modalities', delta: '5x' },
      { label: 'Transcription Accuracy', before: '88%', after: '98.8%', delta: '+10.8%' },
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'useAudioStream.ts',
      code: `export async function streamAudioToWhisper(audioBlob: Blob): Promise<ReadableStream<string>> {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'text');

  const res = await fetch('/api/transcribe', { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Transcription pipeline error');
  return res.body as ReadableStream<string>;
}`,
    },
    metrics: [
      { label: 'Supported Modalities', value: '5 (Text/Voice/Audio/OCR/Doc)' },
      { label: 'Latency', value: '< 850ms' },
      { label: 'Languages', value: '50+' },
    ],
    githubUrl: 'https://github.com/afshintalebi/aura-translate',
    featured: true,
  },
  {
    id: 'bulk-digital-product-uploader',
    title: 'High-Concurrency Bulk Digital Product Uploader',
    subtitle: 'Goroutine Worker Pool Desktop Uploader & Custom WP Engine',
    category: 'automation',
    accentColor: '#00f5ff', // Laser Cyan
    role: 'Systems & Backend Developer',
    impact: 'Automated 10,000+ digital product imports, image optimization routines, and store synchronization with zero manual intervention.',
    description:
      'A mission-critical automation system engineered for high-volume digital commerce. Combines a high-performance cross-platform Go desktop application built with Fyne and Goroutine worker pools with an authenticated custom WordPress/WooCommerce REST API plugin for parallel media processing and inventory batching.',
    technologies: ['Go (Golang)', 'Goroutines', 'Channels', 'Fyne GUI', 'PHP', 'WordPress REST API', 'ImageMagick'],
    features: [
      'Concurrent batch processing utilizing Go goroutines and worker pools with bounded channels',
      'Automated client-side file compression, thumbnail generation, and metadata tagging prior to transmission',
      'Custom WordPress plugin providing high-speed authenticated REST endpoints bypassing standard admin overhead',
      'Fault-tolerant retry queue with SQLite local journaling and resume-on-disconnect capabilities',
    ],
    architecture: 'Producer-Consumer pipeline with bounded channels and token-bucket rate limiting in Go',
    architectureSummary:
      'Local Disk Reader -> Bounded Task Queue (Chan) -> N Goroutine Workers -> ImageMagick Compression -> Multi-part HTTP Payload -> Custom WP Endpoint',
    challenges: [
      'Eliminating server timeouts during large 5GB batch uploads by designing streaming chunked uploads',
      'Managing memory pressure in Go when processing hundreds of high-res image buffers concurrently',
      'Implementing atomic database writes on WordPress to avoid partial or corrupted product state',
    ],
    benchmarks: [
      { label: 'Upload Throughput', before: '12 items/min', after: '128 items/min', delta: '10.6x' },
      { label: 'RAM Footprint', before: '1.2 GB', after: '84 MB', delta: '-93%' },
      { label: 'Sync Failure Rate', before: '4.8%', after: '0.00%', delta: '100% Reliable' },
    ],
    codeSnippet: {
      language: 'go',
      filename: 'worker_pool.go',
      code: `func StartWorkerPool(ctx context.Context, workers int, jobs <-chan ProductJob, results chan<- UploadResult) {
    var wg sync.WaitGroup
    for w := 1; w <= workers; w++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            for job := range jobs {
                res := processAndUpload(ctx, workerID, job)
                results <- res
            }
        }(w)
    }
    wg.Wait()
    close(results)
}`,
    },
    metrics: [
      { label: 'Processing Speed', value: '10x Faster' },
      { label: 'Concurrency Model', value: 'Worker Pool (Go)' },
      { label: 'Memory Usage', value: '< 90 MB' },
    ],
    featured: true,
  },
  {
    id: 'boomly',
    title: 'Boomly — Fitness SaaS Platform',
    subtitle: 'Cloud Platform for Fitness Creators & Workout Monetization',
    category: 'fullstack',
    accentColor: '#10b981', // Emerald Pulse
    role: 'Full-Stack Developer & Backend Lead',
    impact: 'Scalable subscription and workout distribution platform empowering fitness coaches to publish and monetize regimens globally.',
    description:
      'An enterprise cloud platform engineered for fitness professionals to build interactive video regimens, track client adherence metrics in real time, manage recurring subscription billing, and stream digital workouts with low latency.',
    technologies: ['NestJS', 'Node.js', 'MongoDB', 'Google Cloud Platform (GCP)', 'Firebase', 'React', 'Docker'],
    features: [
      'Dynamic workout builder with exercise tagging, video streams, and rest timers',
      'Secure subscription billing engine and customer management portal',
      'Event-driven notification and progress tracking service via Firebase & GCP',
      'High-throughput RESTful API designed with NestJS modular architecture',
    ],
    architecture: 'Modular microservice-ready backend containerized with Docker on Google Cloud Platform',
    architectureSummary:
      'Next.js Client -> Cloudflare CDN -> Google Cloud Run (NestJS API) -> MongoDB Replica Set & Redis Cache -> Firebase Cloud Messaging',
    challenges: [
      'Optimizing complex nested MongoDB aggregation pipelines for user workout analytics',
      'Handling subscription state consistency during webhook bursts from payment gateways',
      'Designing video streaming delivery with dynamic bitrates across diverse mobile networks',
    ],
    benchmarks: [
      { label: 'API P95 Response', before: '420ms', after: '78ms', delta: '-81%' },
      { label: 'Database IOPS', before: 'High spike', after: 'Balanced cache', delta: '5x cache hit' },
      { label: 'Push Delivery Latency', before: '8s', after: '420ms', delta: '-94%' },
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'workout.service.ts',
      code: `@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private readonly workoutModel: Model<WorkoutDocument>,
    private readonly redisCache: CacheService,
  ) {}

  async getAggregatedStats(userId: string): Promise<UserWorkoutStats> {
    const cacheKey = \`stats:user:\${userId}\`;
    const cached = await this.redisCache.get<UserWorkoutStats>(cacheKey);
    if (cached) return cached;

    const stats = await this.workoutModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $group: { _id: '$status', totalVolume: { $sum: '$weight' }, sessions: { $sum: 1 } } },
    ]);
    await this.redisCache.set(cacheKey, stats, 600);
    return stats;
  }
}`,
    },
    metrics: [
      { label: 'Architecture', value: 'Microservices & GCP' },
      { label: 'Database', value: 'MongoDB Cluster' },
      { label: 'Uptime', value: '99.95%' },
    ],
    liveUrl: 'https://www.boomlyapp.com/',
    featured: true,
  },
  {
    id: 'smart-audio-reader',
    title: 'Smart Audio Reader & Whisper Transcriber',
    subtitle: 'Autonomous Speech-to-Text & Language Intelligence App',
    category: 'ai',
    accentColor: '#f59e0b', // Solar Amber
    role: 'Full-Stack Engineer',
    impact: 'High-accuracy audio transcription with automatic dialect detection, timeline timestamps, and multi-format exports.',
    description:
      'A streamlined web application built with Next.js and Tailwind CSS that ingests diverse audio formats, automatically identifies the spoken language, and produces timestamped, error-resistant transcripts powered by OpenAI Whisper.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind UI', 'OpenAI Whisper API', 'Web Audio API'],
    features: [
      'Drag-and-drop audio file ingestion with real-time waveform visualization',
      'Automatic language detection across 90+ spoken dialects with confidence scoring',
      'Exportable transcripts in Markdown, SRT, VTT, and plain text',
      'Clean, accessible UI built for keyboard navigation and rapid review',
    ],
    architecture: 'Client-side Web Audio waveform rendering with streaming serverless inference API',
    architectureSummary:
      'Audio Input -> Web Audio AnalyserNode -> Canvas Waveform -> Chunked Multipart Post -> Whisper Engine -> Segmented Timestamp Alignment',
    challenges: [
      'Visualizing real-time audio waveforms without dropping UI animation frames',
      'Accurate timestamp alignment across varied sampling frequencies and codecs',
    ],
    benchmarks: [
      { label: 'Speech Accuracy', before: '84%', after: '99.1%', delta: '+15.1%' },
      { label: 'Audio Formats', before: 'MP3 only', after: 'MP3, WAV, M4A, OGG', delta: 'Universal' },
      { label: 'Export Options', before: 'Text only', after: '4 Formats (SRT/VTT/MD/TXT)', delta: '4x' },
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'waveform.ts',
      code: `export function renderWaveform(canvas: HTMLCanvasElement, audioBuffer: AudioBuffer) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const rawData = audioBuffer.getChannelData(0);
  const samples = 200;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData: number[] = [];

  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
}`,
    },
    metrics: [
      { label: 'Speech Accuracy', value: '99%+' },
      { label: 'Dialect Support', value: '90+ Languages' },
      { label: 'UI Speed', value: 'Sub-second UI response' },
    ],
    githubUrl: 'https://github.com/afshintalebi/smart-audio-reader',
  },
];
