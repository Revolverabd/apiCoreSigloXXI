const { openConnection } = require('../../../config/dbCnnConfig');

const runQuery = async (sql, binds, autoCommit) => {

    try {

        const connection = await openConnection();
        console.log('open connection');
        const result = await connection.execute(sql, binds, { autoCommit });
        connection.release();
        console.log('close connection');
        return result;

    } catch (error) {

        throw new Error(error);

    }
}

module.exports = { runQuery };

