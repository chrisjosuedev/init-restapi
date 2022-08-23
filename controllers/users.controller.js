const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
    // params = /users?q=something&name=something&apikey=something
    const { q, name = 'no name', apikey } = req.query
    res.status(200).json({
        msg: "get API - Controller",
        q, name, apikey
    });
};

const putUsers = (req = request, res = response) => {
    const id = req.params.id
    res.status(400).json({
        msg: "put API - Controller",
        id
    });
};

const patchUsers = (req = request, res = response) => {
    res.json({
        msg: "patch API - Controller",
    });
}

const postUsers = (req = request, res = response) => {
    const { name, age } = req.body
    res.status(201).json({
        msg: "post API - Controller",
        name, age
    });
};

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: "delete API - Controller",
    });
};

module.exports = {
    getUsers,
    putUsers,
    patchUsers,
    postUsers,
    deleteUsers
};
