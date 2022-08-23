const { Router } = require("express");
const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers,
} = require("../controllers/users.controller");
const router = Router();

// GET -> Get Data
router.get("/", getUsers);

// PUT -> Modify Data
router.put("/:id", putUsers);

// PATCH -> Partial Changes in Data
router.patch("/", patchUsers);

// POST -> Insert Data
router.post("/", postUsers);

// DELETE -> Delete Data
router.delete("/", deleteUsers);

module.exports = router;
