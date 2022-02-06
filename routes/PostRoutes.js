const { Router } = require("express");
const postController = require("../controller/PostController");
const paginatedResults = require("../middleware/PaginatedResults");
const Post = require("../models/Post");

const router = Router();

// CREATE POST

router.post("/post/create", postController.create_post_post);

// GET POST
// GET ALL POSTS

router.get("/post/all/newsfeed", postController.all_posts_newsfeed_get);

router.get("/post/:id", postController.post_get);
// EDIT POST AND MARK POST AS COMPLETED
router.put("/post/:id", postController.edit_post_put);

// DELETE POST
router.delete("/post/:id", postController.post_delete);

// MISSING PET TIMELINE POST
router.get("/post/find/timeline", postController.missing_post_timeline_get);

// ADOPTION PET TIMELINE POST
router.get("/post/adopt/timeline", postController.adoption_post_timeline_get);

router.put("/post/like/:id", postController.like_post_put);

// GET ALL POST BY CURRENT USER
router.get("/post/user/:id", postController.all_posts_by_user_get);

/********************   ADMIN STUFF    *************************/

// CREATE SINGLE POST

// GET OR SEARCH POST
router.get(
    "/admin/posts",
    paginatedResults(Post),
    postController.admin_post_list_get
);
// GET ONE POST

// GET MULTIPLE POSTS

// GET POSTS RELATED / GET MANY REFERENCE

// UPDATE POST

// UPDATE MULTIPLE POST

// DELETE POST

// DELETE MULTIPLE POST

module.exports = router;
