const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const router = require('./route/router')
const logger = require('./utils/log4js').getLogger('info')
const { appConfig } = require('./config')
app.use(koaBody())

// 日志中间件
const logHandler = async (ctx, next) => {
    let startTime = new Date().getTime()
    logger.info('-----------------------------')
    logger.info(`hostname : ${ctx.hostname}`)
    logger.info(`url : ${ctx.href}`)
    await next()
    let endTime = new Date().getTime()
    logger.info(`response : ${JSON.stringify(ctx.response.body)}`)
    logger.info(`spent time : ${endTime - startTime} ms`)
    logger.info('-----------------------------')
}

// 错误处理中间件
const errorHandler = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            msg: err.message
        }
    }
}

// 404处理，最后
const notFoundHanler = async ctx => {
    ctx.response.status = 404
    ctx.response.body = {
        msg: 'Not Found'
    }
}

app.use(logHandler)
app.use(errorHandler)

// 添加路由
app.use(router.routes())

app.use(notFoundHanler)

app.listen(appConfig.port, err => {
    if (err) console.log(err)
    logger.info(`service listening on port 9001...`)
})
