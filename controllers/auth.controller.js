const { request, response } = require('express')
const bcryptjs = require("bcryptjs")

const User = require('../models/user')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req = request, res = response) => {
    const { email, password } = req.body
    
    try {

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect email or password"
            })
        }

        if (!user.status) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exists"
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect email or password"
            })
        }
        
        // Generate JWT
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok: true,
            msg: "User logged",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Login failed",
            error
        })
    }

    
}

module.exports = {
    login
}