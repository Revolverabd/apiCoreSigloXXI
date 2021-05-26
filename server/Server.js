const express = require('express');
const cors = require('cors');

// const { openConnection } = require('../config/dbCnnConfig');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            empleados: '/api/empleados',
            // this.clientesPath = '/api/clientes';
            mesas: '/api/mesas',
            insumos: '/api/insumos',
            recetas: '/api/recetas',
            uploads: '/api/uploads'
        }

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //lectura y parsei del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.empleados, require('../routes/empleado.route'));
        this.app.use(this.paths.mesas, require('../routes/mesa.route'));
        this.app.use(this.paths.insumos, require('../routes/insumo.route'));
        this.app.use(this.paths.recetas, require('../routes/receta.route'));
        this.app.use(this.paths.uploads, require('../routes/upload.route'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;