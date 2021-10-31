const { Router } = require("express");
const postController = require("../controller/PostController");

const router = Router();

// CREATE POST

router.post("/post/create", postController.create_post_post);

// GET POST

router.get("/post/:id", postController.post_get);
// EDIT POST AND MARK POST AS COMPLETED
router.put("/post/:id", postController.edit_post_put);

// DELETE POST
router.delete("/post/:id", postController.post_delete);

// MISSING PET TIMELINE POST
router.get("/post/missing", postController.missing_post_timeline_get);

// ADOPTION PET TIMELINE POST
router.get("/post/adoption", postController.adoption_post_timeline_get);

// GET ALL POST BY CURRENT USER
router.get("/post/user/:id", postController.all_posts_by_user_get);

module.exports = router;
