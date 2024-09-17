import { body, header } from 'express-validator'
import { validateRequest } from '../middleware/validation'
import { getUserDetailsFromId, verifyToken } from '../lib/auth'

const protectedRouter = require('express').Router()
protectedRouter.post(
    '/check',
    [],
    async function (req: any, res: any, next: any) {
        try {
            const token = req.token
            const user = req.user
            res.json({
                token: token,
                user: user,
            })
        } catch (err) {
            next(err)
        }
    }
)

protectedRouter.post('/me', [], async function (req: any, res: any, next: any) {
    try {
        const token = req.token
        const { id } = verifyToken(token)
        const user = await getUserDetailsFromId(id)
        res.json({
            ...user,
            password: undefined,
        })
    } catch (err) {
        next(err)
    }
})

export default protectedRouter
