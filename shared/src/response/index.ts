import { type PortableError } from "../error.js";

export type ResponseBody<BodyData = unknown> = Success<BodyData> | Failure;

type Success<BodyData> = {
    success: true;
    data: BodyData;
    error: null;
};
type Failure = {
    success: false;
    data: null;
    error: PortableError | null;
};

export function isResponseBody(response: unknown): response is ResponseBody {
    return response !== null && typeof response === 'object' && 'data' in response && 'error' in response && 'success' in response && typeof response['success'] === 'boolean';
}
