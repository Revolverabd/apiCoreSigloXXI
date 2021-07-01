const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // this.server = require('http').createServer(this.app);
        // this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            empleados: '/api/empleados',
            clientes: '/api/clientes',
            mesas: '/api/mesas',
            insumos: '/api/insumos',
            recetas: '/api/recetas',
            productos:'/api/productos',
            uploads: '/api/uploads',
            pedido:'/api/pedidos',
            webpay:'/api/webpay',
            pago:'/api/pago',
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

        //Directorio Público
        this.app.use(express.static('public'));

        //Lile Upload -- carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.empleados, require('../routes/empleado.route'));
        this.app.use(this.paths.clientes, require('../routes/cliente.route'));
        this.app.use(this.paths.mesas, require('../routes/mesa.route'));
        this.app.use(this.paths.insumos, require('../routes/insumo.route'));
        this.app.use(this.paths.recetas, require('../routes/receta.route'));
        this.app.use(this.paths.productos, require('../routes/producto.route'));
        this.app.use(this.paths.uploads, require('../routes/upload.route'));
        this.app.use(this.paths.pedido, require('../routes/pedido.route'));
        this.app.use(this.paths.webpay, require('../routes/webpay'));
        this.app.use(this.paths.pago, require('../routes/pago.route'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;