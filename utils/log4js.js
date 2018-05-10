const log4js = require('log4js')

log4js.configure({
    appenders: {
        info: {
            type: 'DateFile',
            filename: './logs/info',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'info'
        },
        error: {
            type: 'DateFile',
            filename: './logs/error',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'error'
        }
    },
    categories: {
        default: {
            appenders: ['info'],
            level: 'info'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
})

module.exports.getLogger = function(category) {
    return log4js.getLogger(category)
}
