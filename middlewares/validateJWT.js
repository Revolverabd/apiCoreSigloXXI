const jwt = require('jsonwebtoken');
// const { idEmpleadoExists, isDeleted } = require('../helpers/dbValidator');
const { getMiddlware } = require('../core/infrastructure/dataBase/daoEmpleadodb');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { guid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const empleado = await getMiddlware(guid);
        
        const {stateDb, idDb} = empleado;

        if (!idDb) {
            res.status(401).json({
                msg: 'token no valido, empleado no existe'
            });
        }

        if (stateDb === 0) {
            res.status(401).json({
                msg: 'token no valido, empleado eliminado'
            });
        }

        req.empleado = empleado;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validateJWT
}