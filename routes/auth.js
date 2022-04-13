const express = require("express");
const authController = require("../controllers/authController");
const {loginValidator, registerValidator, checkErrors} = require("../validations")

const router = express.Router();

router.post("/login", loginValidator, checkErrors,  authController.login);
router.post("/register", registerValidator, checkErrors, authController.register);
router.post("/verify-email", authController.verifyEmail);

module.exports = router;