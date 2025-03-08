import { Router, type NextFunction, type Request, type Response } from 'express';

import { type RequestBodies } from '../../../shared/dist/request/body-types.js';
import { type ResponseBodies } from '../../../shared/dist/response/body-types.js';
import { type Errors } from '../../../shared/dist/error.js';

import { getAllPeopleByBirthplace } from '../controller/getWikiArticlesByBirthPlace.js';
// import { RequestValidators } from '../middleware/validators.js';
import { type WebServer } from '../server.js';

export function createWikidataPeopleRouter(
    context: WebServer
): Router {

    const router = Router();

    router.get(
        '/countries',
        async function (
            req: Request,
            res: Response<ResponseBodies.GET_countries>,
            next: NextFunction
        ) {
            try {
                res.status(200);
                res.send({ success: true, data: context.countryCodeMap, error: null });
            } catch (error) {
                return next(error);
            }
        },
    );

    router.get(
        '/people/:countryCode',
        async function (
            req: Request<{ countryCode: string }>,
            res: Response<ResponseBodies.GET_wikidata_people>,
            next: NextFunction
        ) {
            const { countryCode } = req.params;
            if (!Object.values(context.countryCodeMap).includes(countryCode)) {
                return next(new Error('Invalid countryCode'));
            }
            try {
                const result = await getAllPeopleByBirthplace(countryCode);
                res.status(200);
                res.send({ success: true, data: result, error: null });
            } catch (error) {
                return next(error);
            }
        },
    );

    return router;

}
