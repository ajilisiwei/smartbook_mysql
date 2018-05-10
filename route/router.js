const router = require('koa-router')()
const noteController = require('../controller/noteController')

router.post('/api/note', noteController.addNote)
router.delete('/api/note/:id', noteController.deleteNoteById)
router.get('/api/note/:id', noteController.getNoteById)

exports = module.exports = router
