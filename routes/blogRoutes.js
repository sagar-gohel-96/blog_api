const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const blogController = require("../controllers/blogController")
const app = express();

// regester view engine
app.set("view engine", "ejs");

router.get("/", blogController.blog_index);

//send data
router.post("/", blogController.blog_create_post);

//create blog
router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);
module.exports = router;
