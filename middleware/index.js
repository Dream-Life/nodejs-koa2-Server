const log = require('../log');

const ms = async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
};

const logs = async(ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    log.info(`(${new Date().toLocaleString().replace(',',' ')})  ${ctx.method}  ${ctx.url} ${ctx.status} ${rt}`);
};

module.exports = { ms, logs }