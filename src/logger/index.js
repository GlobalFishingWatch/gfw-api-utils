const winston = require('winston');
const { getPropertyFromNamespace } = require('../namespace');
const { TRANSACTION_ID: { NAMESPACE, PROPERTY } } = require('../constant');

let logConfig = {
    level: {
        key: 'LOG_LEVEL',
        doc:
          'Logging level. In increasing amount of logs: error, warn, info, verbose, debug, silly',
        defaults: { all: 'debug' },
        required: true,
    }
};

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
        serviceName: process.env.npm_package_name || 'not-provided',
        transactionId: getPropertyFromNamespace(NAMESPACE, PROPERTY),
        severity: level2severity[info.level]
    };
});

const log = winston.createLogger({
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
    level: logConfig.level,
});

const setConfig = (config) => {
    logConfig = config;
}

module.exports = {
    setConfig,
    log,
}
