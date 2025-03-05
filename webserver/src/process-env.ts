import { randomBytes } from 'node:crypto';
import { accessSync, constants } from 'node:fs';
import assert from 'node:assert';

interface WebserverExternalEnv {
    NODE_ENV: 'development' | 'production';
    WEBSERVER_BASE_PATH: string;
    WEBSERVER_PORT: string;
    WEBSERVER_FRONTEND_STATIC_FS_PATH: string;
    WEBSERVER_FRONTEND_STATIC_PATH: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends WebserverExternalEnv {}
    }
}

function mutateENV() {
    Error.stackTraceLimit = 3;
}

export function validateENV(): void {
    console.info('Starting ENV validation script');
    mutateENV();

    try {
        let isDev: boolean = process.env.NODE_ENV === 'development';
        if (isDev) {
            console.info({
                NODE_ENV: process.env.NODE_ENV,
                WEBSERVER_BASE_PATH: process.env.WEBSERVER_BASE_PATH,
                WEBSERVER_PORT: process.env.WEBSERVER_PORT,
                WEBSERVER_FRONTEND_STATIC_FS_PATH: process.env.WEBSERVER_FRONTEND_STATIC_FS_PATH,
                WEBSERVER_FRONTEND_STATIC_PATH: process.env.WEBSERVER_FRONTEND_STATIC_PATH,
            } satisfies WebserverExternalEnv);
        }

        assert(
            process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production',
            "validateENV() process.env.NODE_ENV: Allowed values: 'development', 'production'",
        );

        assert(
            typeof process.env.WEBSERVER_BASE_PATH === 'string' && process.env.WEBSERVER_BASE_PATH.length > 0,
            "validateENV() process.env.WEBSERVER_BASE_PATH: Required, use '/' if no base path applies",
        );

        assert(
            process.env.WEBSERVER_BASE_PATH.startsWith('/'),
            "validateENV() process.env.WEBSERVER_BASE_PATH: ",
        );

        assert(
            !process.env.WEBSERVER_BASE_PATH.endsWith('/') || process.env.WEBSERVER_BASE_PATH === '/',
            "validateENV() process.env.WEBSERVER_BASE_PATH: Must not end with '/', unless using bare root '/'",
        );

        assert(
            Number(process.env.WEBSERVER_PORT) > 0 && Number(process.env.WEBSERVER_PORT) % 1 === 0,
            "validateENV() process.env.WEBSERVER_PORT: Must be positive integer",
        );

        accessSync(process.env.WEBSERVER_FRONTEND_STATIC_FS_PATH, constants.R_OK);

        assert(
            typeof process.env.WEBSERVER_FRONTEND_STATIC_PATH === 'string' && process.env.WEBSERVER_FRONTEND_STATIC_PATH.startsWith('/'),
            "validateENV() process.env.WEBSERVER_FRONTEND_STATIC_PATH: Required, must start with '/'",
        );

        console.info('Validated process.env');
    } catch (error) {
        console.error('validateENV() failed, exiting process', error);
        process.exit(1);
    }
}
