const { openConnection } = require('../../../config/dbCnnConfig');

const runQuery = async (sql, binds, options) => {

    try {

        let connection = await openConnection();
        console.log('open connection');
        let result = await connection.execute(sql, binds, { options });
        connection.release();
        console.log('close connection');
        return result;

    } catch (error) {

        throw new Error(error);

    }
}

module.exports = { runQuery };

