import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../lib/auth'
import createError from 'http-errors'
interface CustomRequest extends Request {
    user?: any
    token?: string
}

export const isLoggedInMiddleWare = (
    req: CustomRequest,

    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        return next(createError(401, 'Unauthorized'))
    }
    const token = req.headers.authorization.split(' ')[1]
    try {
        const user = verifyToken(token)
        req.user = user
        req.token = token
        next()
    } catch (error) {
        return next(createError(401, 'Unauthorized'))
    }
}
