/* eslint-disable prettier/prettier */
const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");

router.post("/login", userController.login);
router.get("/upload-image", userController.uploadImage);

module.exports = router;
