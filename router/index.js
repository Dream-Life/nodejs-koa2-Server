const Router = require('koa-router');
const router = new Router();
const { db } = require('../db');
const log = require('../log');

const now = `(${new Date().toLocaleString().replace(',',' ')})  `;

router.post('/login', async(ctx) => {
    let data = ctx.request.body;
    let table = db.get('employer');
    let login = await table.findOne(data);
    if (login) {
        let num = Number(login.logincount) + 1;
        table.update(login, { $set: { islogin: true, logincount: num } });
        let newUserdata = await table.findOne(data);
        ctx.body = { code: 200, user: newUserdata };
        log.info(now + `User "${login.username}" Login Sccessfully`);
        setTimeout(() => {
            log.info(now + `User "${login.username}" Login Out`);
            table.update(newUserdata, { $set: { islogin: false } });
        }, 342000000);
    } else {
        ctx.body = { code: 203, msg: `User "${data.username}" Login Failure` }
        log.warn(now + `User "${data.username}" Login Failure`);
    }
});

module.exports = router;