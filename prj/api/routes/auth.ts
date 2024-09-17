import { body, query } from 'express-validator'
import {
    getUserDetailsFromId,
    googleCallback,
    googleLogin,
    login,
    register,
    verifyToken,
} from '../lib/auth'
import { validateRequest } from '../middleware/validation'
import { rateLimit } from 'express-rate-limit'
var express = require('express')
export const authRouter = express.Router()

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// authRouter.post(
//     '/register',
//     [
//         limiter,
//         body('email').isEmail(),
//         body('password').isLength({ min: 8 }).isString(),
//         validateRequest,
//     ],
//     asyncHandler(async function (req: any, res: any, next: any) {
//         const { email, password } = req.body
//         const { success, token } = await register(email, password)
//         if (success && token) {
//             return res.json({
//                 token,
//             })
//         } else {
//             throw new Error('User already exists')
//         }
//     })
// )

// authRouter.post(
//     '/login',
//     [
//         limiter,
//         body('email').isEmail(),
//         body('password').isLength({ min: 8 }).isString(),
//         validateRequest,
//     ],
//     asyncHandler(async function (req: any, res: any, next: any) {
//         try {
//             const { email, password } = req.body
//             res.json({
//                 token: await login(email, password),
//             })
//         } catch (err) {
//             next(err)
//         }
//     })
// )

authRouter.get('/google', limiter, async (req: any, res: any) => {
    await googleLogin(res)
})
authRouter.get(
    '/callback/google',
    limiter,
    [query('code').isString(), validateRequest],
    async (req: any, res: any) => {
        await googleCallback(req, res)
    }
)
