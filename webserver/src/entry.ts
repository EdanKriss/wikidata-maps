import { validateENV } from './process-env.js';
import { WebServer } from './server.js';

validateENV();

const server = new WebServer();

await server.connect();
