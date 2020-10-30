const winston = require('winston');
const { getPropertyFromNamespace } = require('../namespace');
const { TRANSACTION_ID: { NAMESPACE, PROPERTY } } = require('../constant');

const level2severity = {
    emerg: 'EMERGENCY',
    alert: 'ALERT',
    crit: 'CRITICAL',
    error: 'ERROR',
    warning: 'WARNING',
    notice: 'NOTICE',
    info: 'INFO',
    debug: 'DEBUG',
};

const severity = winston.format(info => {
    return {
        ...info,
        serviceName: process.env.npm_package_name,
        transactionId: getPropertyFromNamespace(NAMESPACE, PROPERTY),
        severity: level2severity[info.level]
    };
});

module.exports = {
    log: winston.createLogger({
        levels: winston.config.syslog.levels,
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.ms(),
                  severity(),
                  winston.format.json(),
                ),
            }),
        ],
        level: process.env.LOG_LEVEL || 'debug',
    })
};
