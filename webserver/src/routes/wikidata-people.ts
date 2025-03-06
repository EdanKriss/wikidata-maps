import { Router, type NextFunction, type Request, type Response } from 'express';

import { type RequestBodies } from '../../../shared/dist/request/body-types.js';
import { type ResponseBodies } from '../../../shared/dist/response/body-types.js';
import { type Errors } from '../../../shared/dist/error.js';

import { getAllPeopleByBirthplace } from '../controller/getWikiArticlesByBirthPlace.js';
// import { RequestValidators } from '../middleware/validators.js';

export function createWikidataPeopleRouter(): Router {

    const router = Router();

    router.get(
        '/:countryCode',
        async (req: Request<{ countryCode: string }>, res, next) => {
            const countryCode = req.params.countryCode;
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
