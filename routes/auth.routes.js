const { Router } = require('express')
const { check } = require("express-validator")
const router = Router()

const { login } = require('../controllers/auth.controller')
const { validateFields } = require('../middlewares/validate-fields')

router.post('/login', [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields
],login)


module.exports = router




