import { Queue } from 'bullmq';

import { config } from './config';

export const QUEUE_NAME = 'named';

export const queue = new Queue(QUEUE_NAME, config.REDIS_HOST);

export const JOBS = {
  SEND_MESSAGE: 'SEND_MESSSAGE',
}

export const jobs = {
  [JOBS.SEND_MESSAGE]: (job: Job<{message: string}>) => {
    const { message } = job.data;

    console.log('send message: ', message);
  },
}
