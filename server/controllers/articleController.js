const Article = require('../models/article')

module.exports = {
    addArticle: (req, res) => {
        Article
            .create({
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.description
            })
            .then(article => {
                res.status(201).json({
                    msg: `Article created successfully`,
                    article
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    findUserArticle: (req, res) => {
        Article
            .find({
                userId: req.params.id
            })
            .populate('userId', 'name')
            .then(articles => {
                res.status(200).json({
                    msg: `Display user article success`,
                    articles
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    getAllArticle: (req, res) => {
        Article
            .find()
            .then(articles => {
                res.status(200).json({
                    msg: `display all articles success`,
                    articles
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}