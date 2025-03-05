import { cpus } from 'node:os';
import cluster from 'node:cluster';
import worker from 'node:worker_threads';

import { validateENV } from './process-env.js';
import { WebServer } from './server.js';

if (cluster.isPrimary) {

    validateENV();

    const threadCount: number =
        process.env.NODE_ENV === 'production'
            ? cpus().length
            : 1;

    for (let i = 0; i < threadCount; i++) {
        const worker = cluster.fork();
    }

} else {

    const server = new WebServer();

    await server.connect();
}
