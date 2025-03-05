import { Router, type NextFunction, type Request, type Response } from 'express';

import { type RequestBodies } from '../../../shared/dist/request/body-types.js';
import { type ResponseBodies } from '../../../shared/dist/response/body-types.js';
import { type Errors } from '../../../shared/dist/error.js';
// import { RequestValidators } from '../middleware/validators.js';

export function createWikidataPeopleRouter(): Router {

    const router = Router();

    // router.get(
    //     '/:id',
    //     authenticateExampleUser,
    //     async (req: Request<{ id: string }>, res, next) => {
    //         const id = req.params.id;
    //         try {
    //             const query = `select * from example_portal.users WHERE id = ${id}`;
    //             const result = await pool.query<ExampleUser>(query);
    //             res.status(200);
    //             res.send({ success: true, data: result.rows[0], error: null } satisfies ResponseBodies.PUT_users);
    //         } catch (error) {
    //             return next(error);
    //         }
    //     },
    // );

    return router;

}
