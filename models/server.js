require('dotenv').config()
const express = require("express");
const cors = require('cors')

const { dbConnection } = require('../db/config')

class Server {
    constructor() {
        // Basic Config
        this.app = express();
        this.port = process.env.PORT

        // Connect to database
        this.database()

        // Routes
        this.usersRoutePath = '/api/users'
        this.authRoutePath = '/api/auth'

        // Middlewares
        this.middlewares()

        // Init Routes
        this.routes()
    }

    async database() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/users.routes'))
        this.app.use(this.authRoutePath, require('../routes/auth.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
