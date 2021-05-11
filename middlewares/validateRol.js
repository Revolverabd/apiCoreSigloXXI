
const isAdminRol = (req, res, next) => {

    if (!req.empleado) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin antes verificar el token'
        });
    }

    const { rolDb } = req.empleado;

    if (rolDb !== 1) {
        return res.status(401).json({
            msg: 'no es administrador'
        });
    }

    next();

}

module.exports = {
    isAdminRol
}