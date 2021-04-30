const UserController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get("/", UserController.findAllUsers);

router.get("/:id", UserController.findById);

router.post("/add", UserController.addUser);

router.delete("/:id", UserController.deleteUser);

router.put("/:id", UserController.editUser)

module.exports = router;