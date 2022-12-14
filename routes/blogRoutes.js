const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const blogController = require("../controllers/blogController")
const app = express();
router.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog4",
    snippet: "jungleees",
    body: "house of animals",
  });
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//get single blog route
router.get("/single-blogs", (req, res) => {
  Blog.findById("63997295e36bcd18a20b1d12")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//get all blog route
router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

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
