import { Worker, QueueEvents } from 'bullmq';
import { jobs, QUEUE_NAME } from './jobs';

const setupJobs = () => {
  // eslint-disable-next-line
  const worker = new Worker(QUEUE_NAME, async job => {
    const jobFn = jobs[job.name];

    if (jobFn) {
      jobFn(job);
    } else {
      console.log('job without handler: ', job);
    }
  });

  const queueEvents = new QueueEvents(QUEUE_NAME);

  queueEvents.on('waiting', ({ jobId }) => {
    console.log(`waiting:${jobId}`);
  });

  queueEvents.on('completed', ({  jobId, returnvalue }) => {
    console.log(`completed:${jobId}:${returnvalue}`);
  });

  queueEvents.on('failed', ({ jobId }) => {
    console.log(`failed:${jobId}`);
  });
};

const run = async () => {
  setupJobs();
}

(async () => {
  await run();
})();
