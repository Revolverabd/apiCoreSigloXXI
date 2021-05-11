const dbValidator = require('../helpers/dbValidator');
const generateJWT = require('../helpers/generateJWT');

module.exports = {

    ...dbValidator,
    ...generateJWT

}