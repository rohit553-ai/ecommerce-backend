const express = require("express");
const authController = require("../controllers/authController");
const {loginValidator, registerValidator, checkErrors} = require("../validations")
const {wrapAsync} = require("../helpers")

const router = express.Router();

router.post("/login", loginValidator, checkErrors,  wrapAsync(authController.login));
router.post("/register", registerValidator, checkErrors, wrapAsync(authController.register));
router.post("/verify-email", authController.verifyEmail);

module.exports = router;