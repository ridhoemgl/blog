const router = require('express').Router()
const { addArticle, getAllArticles, getArticle, editArticle, deleteArticle } = require('../controllers/articleController')

// user
router.post('/add', addArticle)

router.get('/:id', getArticle)
router.get('/', getAllArticles)
router.put('/:id', editArticle)
router.delete('/:id', deleteArticle)

module.exports = router