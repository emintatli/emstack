import { errorResponse, successResponse } from '../lib/response'
import { isLoggedInMiddleWare } from '../middleware/auth'
import { authRouter } from './auth'
import protectedRouter from './protected'
import createError from 'http-errors'

var express = require('express')

export const indexRouter = express.Router()

indexRouter.get('/', async function (req: any, res: any, next: any) {
    res.json({
        title: 'Express',
    })
})
indexRouter.get('/error', async function (req: any, res: any, next: any) {
    return next(createError(400, 'This is a test error')) // example error
})

indexRouter.get('/test', async function (req: any, res: any, next: any) {
    return successResponse(res, 'This is a test success')
})

indexRouter.use('/auth', authRouter)

indexRouter.use('/protected', [isLoggedInMiddleWare], protectedRouter)

indexRouter.use((err: any, req: any, res: any, next: any) => {
    return errorResponse(res, err.status || 500, err)
})
