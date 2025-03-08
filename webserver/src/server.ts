import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import http from 'node:http';
import express from 'express';

import { UI_SPA_ROUTES } from '../../shared/dist/request/ui-routes.js';
import { type ResponseBody } from '../../shared/dist/response/index.js';
import { type CountryCodeMap } from "../../shared/dist/model/country.js";
import { fetchAllCountryCodes } from './controller/countryCodes.js';

import { createWikidataPeopleRouter } from './routes/wikidata-people.js';

export class WebServer {
    #app: express.Express;
    #httpServer: http.Server;
    #port: number = process.env.WEBSERVER_PORT ? Number(process.env.WEBSERVER_PORT) : 3000;
    #viewsDir: string = fileURLToPath(import.meta.resolve('../views'));
    #html404: string = readFileSync(path.join(this.#viewsDir, '404.html')).toString();
    countryCodeMap: CountryCodeMap = {};

    constructor() {
        this.#app = express();
        this.#httpServer = http.createServer(this.#app);

        this.#allowCORS();
        this.#app.use(
            process.env.WEBSERVER_BASE_PATH,
            this.#frontendStaticMiddleware(),
        );
        this.#app.use(express.json());
        this.#app.use(this.#logRequest);
        this.#app.use(
            path.join(process.env.WEBSERVER_BASE_PATH, '/wikidata'),
            createWikidataPeopleRouter(this),
        );
        this.#app.use(this.#handle404);
        this.#app.use(this.#handleError);
    }

    public async connect() {
        await this.#updateCountryCodes();

        this.#httpServer.listen(this.#port, () => {
            console.info(`HTTP Server started on port: ${this.#port}`);
        });
    }

    async #cleanup() {
        console.info('#cleanup() started');
        this.#httpServer.close();
        console.info('#cleanup() finished');
    }

    #logRequest: express.RequestHandler = ({ ip, method, path, params, query, body }, res, next) => {
        let bodyToLog = body;
        if (process.env.NODE_ENV === 'production') {
            if (method === 'POST' && path.endsWith('/login')) {
                bodyToLog = { ...body, password: 'Redacted' };
            }
        }
        console.info('Incoming Request', { request: { ip, method, path, params, query, body: bodyToLog } });
        next();
    }

    #frontendStaticMiddleware(): express.Router {
        const router = express.Router();
        router.get(
            [ ...UI_SPA_ROUTES ],
            (req, res, next) => {
                res.status(200);
                res.sendFile(path.join(process.env.WEBSERVER_FRONTEND_STATIC_FS_PATH, 'index.html'));
            },
        );
        // serve frontend build files
        router.use(
            process.env.WEBSERVER_FRONTEND_STATIC_PATH,
            express.static(process.env.WEBSERVER_FRONTEND_STATIC_FS_PATH),
        );
        // serve express view files
        router.use(
            'views',
            express.static(this.#viewsDir),
        );
        return router;
    }
    
    #handleError: express.ErrorRequestHandler = (
        error: any, 
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction,
    ) => {
        res.status(error.status || 500);
        res.send({
            success: false, 
            data: null, 
            error: error.message,
        } satisfies ResponseBody);
    }
    
    #handle404: express.RequestHandler = (
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction,
    ) => {
        res.status(404);
        res.send(this.#html404);
    }

    #allowCORS(): void {
        this.#app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.#app.options("/*", function(req, res, next){
            res.sendStatus(200);
        });
    }

    async #updateCountryCodes(): Promise<void | never> {
        try {
            this.countryCodeMap = await fetchAllCountryCodes();
            console.info('Connected to wikidata successfully.');
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}
