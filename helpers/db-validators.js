const Role = require("../models/role")
const User = require("../models/user")

const isValidRole = async (role = "") => {
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error (`${role} doesn't exists`.trim())
    }
}

const isValidEmail = async (email = "") => {
    const emailExists = await User.findOne({ email })

    if (emailExists) {
        throw new Error (`${email} has already been registered`)
    }
}

const existsId = async (id) => {
    const idExists = await User.findById(id)

    if (!idExists) {
        throw new Error (`${id} doesn't exists`)
    }
}

module.exports =  {
    isValidRole,
    isValidEmail,
    existsId
}