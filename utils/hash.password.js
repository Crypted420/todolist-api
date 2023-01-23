const crypto = require('crypto');

const cryptPassword = (password) => {
    return crypto.createHmac('sha256', 'secret').update(password).digest('hex');
}

module.exports = { cryptPassword }  