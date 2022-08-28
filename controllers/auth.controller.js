const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const { googleVerify } = require('../helpers/google-validate')

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect email or password",
            });
        }

        if (!user.status) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exists",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect email or password",
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            msg: "User logged",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Login failed",
            error,
        });
    }
};

const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token)

        let user = await User.findOne({ email })

        if (!user) {
            const data = {
                name,
                email,
                password: "null",
                img,
                role: "USER_ROLE",
                google: true,
            }

            user = new User(data)
            await user.save()
        }

        // user with Status = false
        if (!user.status) {
            res.status(401).json({
                ok: false,
                msg: "User is disabled, contact with administrator"
            });
        }

        // Generate JWT new Google User
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            msg: "User logged with Google",
            user,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Login with Google failed",
            id_token,
        });
    }
};

module.exports = {
    login,
    googleSingIn,
};