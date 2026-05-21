/**
 * PROTOTYPE - WIPE ME
 * 
 * Question this answers: "How does the async AI pipeline flow work from NestJS -> Queue -> Worker -> WebSocket?"
 * 
 * Note: The plan assumed Redis was in the stack for BullMQ, but it's not in docker-compose.yml yet!
 * This prototype uses an in-memory queue to simulate the exact async mechanics of BullMQ/RabbitMQ
 * before we commit to installing one.
 * 
 * How to run:
 * cd backend && npx ts-node ws5-prototype.ts
 */

import * as readline from 'readline';

// --- Pure Logic Modules ---

type Job = {
  id: string;
  type: string;
  payload: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
};

class MockQueue {
  private jobs: Map<string, Job> = new Map();
  private listeners: { [event: string]: ((job: Job) => void)[] } = {};

  add(type: string, payload: any): Job {
    const job: Job = {
      id: `job-${Date.now().toString().slice(-4)}`,
      type,
      payload,
      status: 'pending'
    };
    this.jobs.set(job.id, job);
    this.emit('added', job);
    return job;
  }

  updateStatus(id: string, status: Job['status'], result?: any) {
    const job = this.jobs.get(id);
    if (job) {
      job.status = status;
      if (result) job.result = result;
      this.emit(status, job);
    }
  }

  getJobs() {
    return Array.from(this.jobs.values());
  }

  on(event: string, callback: (job: Job) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  private emit(event: string, job: Job) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(job));
    }
  }
}

class MockWorker {
  constructor(private queue: MockQueue) {
    this.queue.on('added', (job) => {
      this.processJob(job);
    });
  }

  private async processJob(job: Job) {
    // 1. Mark as processing
    this.queue.updateStatus(job.id, 'processing');
    
    // 2. Simulate AI processing time (FastAPI latency)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Generate insight
    const result = {
      insight: `AI detected potential correlation in ${job.payload.reason}. Recommend follow-up in 2 weeks.`,
      confidence: 0.89
    };
    
    // 4. Mark as completed
    this.queue.updateStatus(job.id, 'completed', result);
  }
}

class MockWebSocketGateway {
  private clients: Set<string> = new Set(['clinician-1']); // Connected clinician

  broadcast(message: any) {
    return Array.from(this.clients).map(client => ({
      to: client,
      message
    }));
  }
}

// --- TUI Application ---

const queue = new MockQueue();
const worker = new MockWorker(queue); // Starts listening
const wsGateway = new MockWebSocketGateway();
let lastWsMessage: any = null;

// The NestJS layer listens to the queue to send WS messages
queue.on('completed', (job) => {
  lastWsMessage = wsGateway.broadcast({
    type: 'AI_INSIGHT_READY',
    encounterId: job.payload.encounterId,
    data: job.result
  });
  render();
});

queue.on('processing', () => render());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

function render() {
  console.clear();
  console.log('\x1b[1m=== WS-5: Async AI Pipeline Prototype ===\x1b[0m\n');
  
  console.log('\x1b[1m[ Queue State (BullMQ/RabbitMQ Mock) ]\x1b[0m');
  const jobs = queue.getJobs();
  if (jobs.length === 0) {
    console.log('\x1b[2m  No jobs in queue.\x1b[0m');
  } else {
    jobs.forEach(job => {
      let color = '\x1b[33m'; // yellow for pending
      if (job.status === 'processing') color = '\x1b[36m'; // cyan
      if (job.status === 'completed') color = '\x1b[32m'; // green
      
      console.log(`  ${color}• [${job.id}] ${job.status.toUpperCase()}\x1b[0m -> ${job.type} (Enc: ${job.payload.encounterId})`);
    });
  }
  
  console.log('\n\x1b[1m[ WebSocket Gateway ]\x1b[0m');
  if (lastWsMessage) {
    console.log('\x1b[32m  Message Pushed to Client:\x1b[0m');
    console.log(`\x1b[2m  ${JSON.stringify(lastWsMessage, null, 2)}\x1b[0m`);
  } else {
    console.log('\x1b[2m  Waiting for AI worker to finish...\x1b[0m');
  }

  console.log('\n-------------------------------------------------');
  console.log('\x1b[1m[e]\x1b[0m \x1b[2mSimulate Encounter Completion (NestJS -> Queue)\x1b[0m');
  console.log('\x1b[1m[q]\x1b[0m \x1b[2mQuit\x1b[0m');
}

let encounterCounter = 1;

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    console.clear();
    process.exit();
  }

  if (key.name === 'e') {
    queue.add('GenerateInsight', {
      encounterId: `enc-${encounterCounter++}`,
      reason: 'Fever and chills',
      patientId: 'pat-123'
    });
    render();
  }
});

render();
