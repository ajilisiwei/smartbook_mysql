const Promise = require('bluebird')
const dbHelper = Promise.promisifyAll(require('../utils/dbHelper'))
const TABLE_NAME = 'note'
/**
 * 添加笔记
 * @param {笔记内容} note
 */
function insert(note) {
    let sql = `insert into ${TABLE_NAME}(title,content,createdby) values(?,?,?)`
    return dbHelper
        .executeSqlAsync(sql, [note.title, note.content, note.createdby])
        .then(result => {
            return result.affectedRows === 1
        })
        .catch(err => {
            return false
        })
}

function remove(id) {
    let sql = `delete from ${TABLE_NAME} where id=?`
    return dbHelper
        .executeSqlAsync(sql, [id])
        .then(result => {
            return result.affectedRows >= 0
        })
        .catch(err => {
            return false
        })
}

function selectById(id) {
    let sql = `select * from ${TABLE_NAME} where id=?`
    return dbHelper
        .executeSqlAsync(sql, [id])
        .then(result => result)
        .catch(err => null)
}

exports = module.exports = {
    insert,
    remove,
    selectById
}
