const oracledb = require('oracledb');

const { runQuery } = require('./connection/useConnection');

const getIdRol = async (rol) => {

    sql = `BEGIN SP_GETROL(:rol, :resultRol); END;`

    const result = await runQuery
        (sql,
            {
                rol: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: rol },
                resultRol: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            },
            false
        );
        
    const rolDb = result.outBinds.resultRol;
    return rolDb;
}

module.exports = {
    getIdRol
}