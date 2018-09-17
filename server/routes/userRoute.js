const router = require('express').Router()
const { signupUser, signinUser } = require('../controllers/userController')

// user
router.post('/signup', signupUser)
router.post('/signin', signinUser)


module.exports = router