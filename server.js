const Koa = require('koa');
const router = require('./router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const { db, init } = require('./db');
const { ms, logs } = require('./middleware');

// db
init(db);

// koa
const app = new Koa();

// middleware
app.use(logs)
    .use(ms)
    .use(json())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

// prot
app.listen(3000, () => {
    console.log('server is listening at http://localhost:3000');
});