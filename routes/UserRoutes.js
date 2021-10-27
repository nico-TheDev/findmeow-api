const { Router } = require("express");
const userController = require("../controller/UserController");
const router = Router();

// CREATER USER
router.post("/signup", userController.signup_post);
// LOGIN USER
// EDIT USER INFO
// DELETE USER

module.exports = router;
