const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { //记录器1:输出到控制台
            type: 'console',
        },
        log_file: {
            type: 'file',
            filename: __dirname + '/ems.log',
            encoding: 'utf-8',
            backups: 3,
            maxLogSize: 20971520
        },
        date_file: {
            type: 'dateFile',
            filename: __dirname + '/date/ems',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            daysToKeep: 100,
            pattern: "-yyyy-MM-dd-hh.log"
        },
        error_file: {
            type: "dateFile",
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            daysToKeep: 100,
            pattern: "-yyyy-MM-dd-hh.log",
            filename: __dirname + '/error/ems_err'
        }
    },
    categories: {
        default: { appenders: ['date_file', 'console', 'log_file'], level: 'info' },
        // production: { appenders: ['data_file'], level: 'warn' },
        // console: { appenders: ['console'], level: 'debug' },
        // debug: { appenders: ['console', 'log_file'], level: 'debug' },
        // error_log: { appenders: ['error_file'], level: 'error' }
    }
});


module.exports = log4js.getLogger();