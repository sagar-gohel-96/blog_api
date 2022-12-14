const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
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

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
});

//send data
router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

//create blog
router.get("/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/blogs" });
  });
});
module.exports = router;
