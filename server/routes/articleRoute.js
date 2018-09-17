const router = require('express').Router()
const { addArticle, findUserArticle } = require('../controllers/articleController')

// user
router.post('/add', addArticle)
router.get('/:id', findUserArticle)


module.exports = router