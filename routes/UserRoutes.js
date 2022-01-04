const { Router } = require("express");
const router = Router();

const userController = require("../controller/UserController");
const { upload } = require("../middleware/Upload");

// CREATER USER
router.post("/signup", upload.single("profileImg"), userController.signup_post);
// LOGIN USER
router.post("/login", userController.login_post);
// GET USER INFO
router.get("/user/:id", userController.user_get);
// DELETE USER
router.delete("/user/:id", userController.user_delete);
// EDIT USER
router.put("/user/:id", userController.user_put);

module.exports = router;
