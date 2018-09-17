const User = require('../models/user')

module.exports = {
    signupUser: (req, res)  => {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(201).json({
                    msg: `User created successfully`,
                    user
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    signinUser: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if(user){
                    if(user.password == req.body.password){
                        res.status(200).json({
                            msg: `User login successfully`,
                            user
                        })
                    }else{
                        res.status(401).json({
                            msg: 'password wrong'
                        })  
                    }
                }else{
                    res.status(404).json({
                        msg: 'user not found'
                    }) 
                }
                
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    getAllUsers: (req, res) => {
        User
            .find()
            .then(users => {
                res.status(200).json({
                    users
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    getUser: (req, res) => {
        User
            .find({
                _id: req.params.id
            })
            .then(user => {
                res.status(200).json({
                    user
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    editUser: (req, res) => {
        User
            .findOneAndUpdate({
                _id: req.params.id
            },{
                $set:{
                    name: req.body.name
                }
            })
            .then(() => {
                res.status(200).json({
                    msg: 'update user success',
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    deleteUser: (req, res) => {
        User
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json({
                    msg: 'delete user success',
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}