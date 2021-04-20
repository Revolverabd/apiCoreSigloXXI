const oracledb = require('oracledb');

connectionString = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CNN
}

const openConnection = async () => {
    let connection = await oracledb.getConnection(connectionString);
    return connection;
}

module.exports = { openConnection }