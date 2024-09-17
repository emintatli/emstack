import { DataSource } from 'typeorm'
import { User } from '../db/User'
import { GoogleAuthUser } from '../db/GoogleAuthUser'
const parse = require('pg-connection-string').parse

export const initdb = () => {
    try {
        const dbString = parse(process.env.DATABASE_URL)
        const AppDataSource = new DataSource({
            type: 'postgres',
            host: dbString.host,
            port: dbString.port,
            username: dbString.user,
            password: dbString.password,
            database: dbString.database,
            synchronize: process.env.NODE_ENV !== 'production',
            logging: false,
            entities: [User, GoogleAuthUser],
            migrations: [],
            subscribers: [],
        })
        AppDataSource.initialize()
        console.log('Database connected')
    } catch (error) {
        console.error('Error connecting to the database', error)
    }
}
