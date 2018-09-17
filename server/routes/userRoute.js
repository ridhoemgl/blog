const router = require('express').Router()
const { signupUser, signinUser, getAllUsers, getUser, editUser, deleteUser  } = require('../controllers/userController')

// user
router.post('/signup', signupUser)
router.post('/signin', signinUser)

router.get('/', getAllUsers)
router.get('/:id', getUser)

router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router