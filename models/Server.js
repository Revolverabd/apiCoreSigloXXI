const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.empleadosPath = '/api/empleados';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //lectura y parsei del body
        this.app.use( express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.empleadosPath, require('../routes/empleado.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;