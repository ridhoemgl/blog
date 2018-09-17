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
    getArticle: (req, res) => {
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
    getAllArticles: (req, res) => {
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
    },
    editArticle: (req, res) => {
        Article
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $set:{
                    title: req.body.title
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: 'update article success',
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    deleteArticle: (req, res) => {
        Article
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({
                    msg: 'delete article success',
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}