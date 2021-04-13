
const empleadosGet = (req, res) => {
    res.json({
        msg: 'get'
    });
};

const createEmpleado = (req, res) => {

    const empleado = req.body;

    res.json({
        empleado
    });
};

const updateEmpleadoById = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put',
        id
    });
};

const deleteEmpleadoById = (req, res) => {
    res.json({
        msg: 'delete'
    });
};

const updateAnEmpleadoById = (req, res) => {
    res.json({
        msg: 'patch'
    });
};

module.exports = {
    empleadosGet,
    createEmpleado,
    updateEmpleadoById,
    deleteEmpleadoById,
    updateAnEmpleadoById
}