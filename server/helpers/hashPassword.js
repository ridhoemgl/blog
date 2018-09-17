const bcrypt = require('bcryptjs');

function hashPassword(password){
    let hash = bcrypt.hashSync(password, 8)
    return hash
}
module.exports = hashPassword