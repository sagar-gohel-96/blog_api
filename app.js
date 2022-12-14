const Blog = require("./models/blog");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

const db = mongoose.connection;

// const path =require("path");

//mongodb connection
const dbUri =
  "mongodb+srv://sagar:sagar1101G@cluster0.umaq8an.mongodb.net/blogs?retryWrites=true&w=majority";
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//css & middleware
const morgan = require("morgan");
const { render } = require("ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
//add blog route
app.get("/add-blog", (req, res) => {
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
app.get("/single-blogs", (req, res) => {
  Blog.findById("63997295e36bcd18a20b1d12")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//get all blog route
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// regester view engine
app.set("view engine", "ejs");

//home page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// app.get('/',(req, res)=> {
//     res.sendFile(path.join(__dirname, '/views/index.html'));
//   });

//about page
app.get("/about", (req, res) => {
  try {
    // res.sendFile("./views/about.html",{ root : __dirname })
    res.render("about", { title: "About" });
    // res.end();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// app.get('/about', (req, res) =>{
//     res.sendFile(path.join(__dirname, '/views/about.html'));
// });

//redirect
// app.get('/about-us',(req, res)=>{
//     res.redirect("/about")
// })

app.get("/blogs", (req, res) => {
  Blog.find().sort({createdAt :-1} )
    .then((result) => res.render('index',{title:'All Blogs', blogs : result})) 
    .catch((err) => console.log(err));
});

//send data
app.post("/blogs",(req, res)=>{
  const blog = new Blog(req.body)
  blog.save()
   .then((result) => res.redirect('/blogs'))
     .catch((err) => console.log(err))
} )

//create blog
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result)=>{
    res.render("details",{title:'Blog Details', blog : result})
  }).catch((err) => console.log(err))
})



//404 page
app.use((req, res) => {
  // res.status(400).sendFile("./views/404.html",{ root : __dirname })
  res.status(404).render("404", { title: "404" });
});

console.log("server is listening on port " + port);
