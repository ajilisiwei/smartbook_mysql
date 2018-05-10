const mysql = require('mysql')
const { dbConfig } = require('../config')
const infoLogger = require('../utils/log4js').getLogger('info')
const errorLogger = require('../utils/log4js').getLogger('error')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})

/**
 *
 * @param {要执行的sql} sql
 * @param {sql的参数数组} values
 * @param {回调事件} callback
 */
function executeSql(sql, values, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            errorLogger.error(`sql : ${sql}`)
            errorLogger.error(`values : ${values}`)
            errorLogger.error(`error : ${JSON.stringify(err)}`)
            callback(err, null)
        } else {
            infoLogger.info(`sql : ${sql}`)
            infoLogger.info(`values : ${values}`)
            connection.query(sql, values, (err, results, fields) => {
                connection.release()
                if (err) {
                    errorLogger.error(`sql : ${sql}`)
                    errorLogger.error(`values : ${values}`)
                    errorLogger.error(`error : ${JSON.stringify(err)}`)
                } else {
                    infoLogger.info(`result : ${JSON.stringify(results)}`)
                }
                callback(err, results)
            })
        }
    })
}

pool.on('acquire', connection => {
    infoLogger.info(`acquire connection threadId : ${connection.threadId}`)
    // console.log(`[${new Date()}] : Connection ${connection.threadId} acquired.`)
})

pool.on('release', connection => {
    // console.log(`[${new Date()}] : Connection ${connection.threadId} released.`)
    infoLogger.info(`release connection threadId : ${connection.threadId}`)
})

pool.on('end', err => {
    // if (err) console.log(`[${new Date()}] : Pool end by error:`)
    if (err) {
        logger.error(`pool end error : ${JSON.stringify(err)}`)
    }
    infoLogger.info(`pool end`)
})

exports = module.exports = {
    executeSql
}
