require('dotenv').config()
const express = require("express");
// https://www.npmjs.com/package/cors
// Revisar CORS
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
        // Routes
        this.usersRoutePath = '/api/users'

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/users.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
