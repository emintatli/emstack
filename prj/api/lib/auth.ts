import { User } from '../db/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import axios from 'axios'
import { GoogleAuthUser } from '../db/GoogleAuthUser'
import { errorResponse } from './response'

interface jwtPayload {
    id: number
    email: string
}

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

export const sign = (payload: jwtPayload) => {
    return jwt.sign(payload, process.env.AUTH_TOKEN_SECRET!, {
        expiresIn: '30 days',
    })
}
export const verifyToken = (token: string): jwtPayload => {
    return jwt.verify(token, process.env.AUTH_TOKEN_SECRET!) as jwtPayload
}
export const hash = async (password: string) => {
    return await bcrypt.hash(password, 10)
}
export const verifyHash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}
export const register = async (
    email: string,
    password?: string,
    gAuth?: GoogleAuthUser | null
) => {
    // check if users exists
    const existing = await User.findOne({
        where: { email },
        select: ['email', 'id'],
        relations: ['google'],
    })
    if (existing && !gAuth) {
        // user exists  - err
        return {
            success: false,
            token: null,
        }
    } else if (existing && gAuth && !existing.google) {
        existing.google = gAuth
        await existing.save()
        return {
            success: true,
            token: sign({ id: existing.id, email: existing.email }),
        }
    } else if (existing && gAuth && existing.google) {
        existing.google.access_token = gAuth.access_token
        existing.google.refresh_token = gAuth.refresh_token
        existing.google.id_token = gAuth.id_token
        existing.google.expiry_date = gAuth.expiry_date
        await existing.google.save()
        return {
            success: true,
            token: sign({ id: existing.id, email: existing.email }),
        }
    } else if (!existing) {
        const user = new User()
        user.email = email
        if (gAuth) {
            user.google = gAuth
            user.password = await hash(Math.random().toString())
        } else if (password) {
            user.password = await hash(password)
        } else {
            throw new Error('Password is required')
        }
        // save user
        await user.save()
        // return token
        return {
            success: true,
            token: sign({ id: user.id, email: user.email }),
        }
    }
}
export const login = async (email: string, password: string) => {
    // find user
    const user = await User.findOne({ where: { email } })
    if (!user) {
        throw new Error('Invalid details')
    }
    // verify password
    const valid = await verifyHash(password, user.password)
    if (!valid) {
        throw new Error('Invalid details')
    }
    // return token
    return sign({ id: user.id, email: user.email })
}
export const getUserDetailsFromId = async (id: number) => {
    const user = await User.findOne({ where: { id }, relations: ['google'] })
    if (!user) {
        throw new Error('Invalid id')
    }
    return user
}

export const googleLogin = async (res: any) => {
    const url = oauth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    })
    res.redirect(url)
}
export const googleCallback = async (req: any, res: any) => {
    const { code } = req.query
    const { tokens } = await oauth2Client.getToken(code)
    const response = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        }
    )
    const user = response.data
    // Check if user's email is verified
    if (!user.verified_email) {
        return errorResponse(res, 400, 'Email not verified')
    }

    const newG = () => {
        const _gData = new GoogleAuthUser()
        _gData.email = user.email
        _gData.name = user.name || ''
        _gData.picture = user.picture || ''
        _gData.given_name = user.given_name || ''
        _gData.access_token = tokens.access_token!
        _gData.refresh_token = tokens.refresh_token!
        _gData.id_token = tokens.id_token!
        _gData.expiry_date = new Date(tokens.expiry_date!)
        return _gData
    }
    const _userInfo = await register(user.email, undefined, newG())
    return res
        .status(301)
        .redirect(`${process.env.SITE_URL}/login?token=${_userInfo!.token}`)
}
