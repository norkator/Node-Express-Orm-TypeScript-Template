import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import HttpError from './error/index';
import * as http from 'http';
import app from "./server";

interface RequestWithUser extends Request {
    user: object | string;
}

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: authorization
 */
export function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): void {
    try {
        const jwtToken: any = req.headers['authorization'].replace(/^Bearer\s/, '');

        if (jwtToken) {
            try {
                req.user = jwt.verify(jwtToken, app.get('secret'));

                return next();

            } catch (error) {
                return next(new HttpError(401, http.STATUS_CODES[401]));
            }
        }
    } catch (e) {
    }

    return next(new HttpError(400, 'No token provided'));

}