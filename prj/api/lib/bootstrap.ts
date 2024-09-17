import { initdb } from './db'

export const bootstrap = () => {
    if (!process.env.AUTH_TOKEN_SECRET) {
        throw new Error('AUTH_TOKEN_SECRET is not set')
    }
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set')
    }
    if (!process.env.GOOGLE_CLIENT_ID) {
        throw new Error('GOOGLE_CLIENT_ID is not set')
    }
    if (!process.env.GOOGLE_CLIENT_SECRET) {
        throw new Error('GOOGLE_CLIENT_SECRET is not set')
    }
    if (!process.env.GOOGLE_REDIRECT_URI) {
        throw new Error('GOOGLE_REDIRECT_URI is not set')
    }
    if (!process.env.AUTH_TOKEN_SECRET) {
        throw new Error('AUTH_TOKEN_SECRET is not set')
    }
    initdb()
}
