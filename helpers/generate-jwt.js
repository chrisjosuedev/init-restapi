require('dotenv').config()
const jwt = require('jsonwebtoken')

// uid => User Identifier

const generateJWT = (uid = "") => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: "4h",
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("Token generation failed")
            } else {
                resolve(token)
            }
        })
    })

}

module.exports = {
    generateJWT
}