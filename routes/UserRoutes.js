const { Router } = require("express");
const router = Router();

const userController = require("../controller/UserController");
const { upload } = require("../middleware/Upload");
const paginatedResults = require("../middleware/PaginatedResults");
const User = require("../models/User");

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

// ALL USER
router.get("/admin/user/");

// FOR ADMIN

// CREATE SINGLE USER

// GET OR SEARCH USER
router.get(
    "/admin/users",
    paginatedResults(User),
    userController.admin_user_list_get
);

// GET ONE USER

// GET MULTIPLE USER

// GET USER RELATED / GET MANY REFERENCE

// UPDATE USER

// UPDATE MULTIPLE USER

// DELETE USER

// DELETE MULTIPLE USER

module.exports = router;
