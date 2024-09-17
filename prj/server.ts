import 'dotenv/config'
import 'reflect-metadata'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import express from 'express'
import { indexRouter } from './api/routes'
import { bootstrap } from './api/lib/bootstrap'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    bootstrap()
    server.use('/api', indexRouter)
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url!, true)
        return handle(req, res, parsedUrl)
    })

    createServer(server).listen(port, () => {
        console.log(
            `> Server listening at port:${port} as ${
                dev ? 'development' : process.env.NODE_ENV
            }`
        )
    })
})
