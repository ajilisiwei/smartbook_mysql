const noteService = require('../service/noteService')
// 添加笔记
async function addNote(ctx, next) {
    let body = ctx.request.body
    let newnote = {
        title: body.title,
        content: body.content,
        createdby: 'weiwei'
    }
    let result = await noteService.insert(newnote)
    if (result) ctx.response.body = { msg: 'successed', result: newnote }
    else ctx.response.body = { message: 'failed' }
}

async function deleteNoteById(ctx, next) {
    let id = ctx.params.id
    let result = await noteService.remove(id)
    if (result) ctx.response.body = { msg: 'successed' }
    else ctx.response.body = { msg: 'failed' }
}

async function getNoteById(ctx, next) {
    let id = ctx.params.id
    let result = await noteService.selectById(id)
    if (result) ctx.response.body = { msg: 'successed', result: result }
    else ctx.response.body = { msg: 'failed', result: result }
}

exports = module.exports = {
    addNote,
    deleteNoteById,
    getNoteById
}
