const monk = require('monk');

const config = {
    url: 'mongodb://dream:gaobingxue!994@localhost:27017/ems'
}

const db = new monk(config.url);

const init = async(db) => {
    const employer = db.get('employer');

    if ((await employer.find()).length === 0) {
        employer.insert([{
            "username": "admin",
            "password": "465c194afb65670f38322df087f0a9bb225cc257e43eb4ac5a0c98ef5b3173ac",
            "lastname": "",
            "firstname": "",
            "address": "",
            "telephone": "",
            "isadmin": true,
            "islogin": false,
            "lastlogin": "",
            "logincount": -1
        }]).then(() => db.close())
    }
}

module.exports = { config, init, db };