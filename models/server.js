require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        // Basic Config
        this.app = express();
        this.port = process.env.PORT;

        // Connect to database
        this.database();

        // Routes
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
        };

        // Middlewares
        this.middlewares();

        // Init Routes
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true // Create Path is doesn't exists
            })
        );
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(
            this.paths.categories,
            require('../routes/categories.routes')
        );
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
