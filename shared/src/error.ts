/**
 *  @description Extends NodeJS.ErrnoException (and therefore also Error).
 * 
 *  Suitable for fronend and backend errors, because all of Node specific properties are optional.
 * 
 *  Errors originating in the backend will have a 'status' property corresponding to the HTTP status.
 */
export interface PortableError extends NodeJS.ErrnoException {
    status?: number;
}

export namespace Errors {
    export interface Default extends PortableError {
        name: "DefaultError";
        status: 500;
    }

    export interface System extends PortableError {
        name: "SystemError";
        errno: number;
        code: string;
        status: 500;
    }

    export interface ServerApplication extends PortableError {
        name: "ServerApplicationError";
        status: 500;
    }

    export interface NotFound extends PortableError {
        name: "NotFoundError";
        status: 404;
    }
    export interface TooLarge extends PortableError {
        name: "TooLargeError";
        status: 413;
    }

    export interface FileSystem extends PortableError {
        name: "FileSystemError";
        status: 500;
    }

    export interface Unauthorized extends PortableError {
        name: "UnauthorizedError";
        status: 401;
    }
    export interface TokenExpired extends PortableError {
        name: "TokenExpiredError";
        status: 401;
    }
    export interface MissingToken extends PortableError {
        name: "MissingTokenError";
        status: 401;
    }

    export interface Forbidden extends PortableError {
        name: "ForbiddenError";
        status: 403;
    }

    export interface InvalidRequest extends PortableError {
        name: "InvalidRequestError";
        status: 400;
    }

    export interface InvalidArgument extends PortableError {
        name: "InvalidArgumentError";
        status?: 500;
    }

    export interface Validation extends PortableError {
        name: "ValidationError";
        status?: 400 | 500;
    }

    export interface DatabaseConnection extends PortableError {
        name: "DatabaseConnectionError";
        status: 503;
    }

    export interface UniqueIndex extends PortableError {
        name: "UniqueIndexError";
        status: 409;
    }
}
