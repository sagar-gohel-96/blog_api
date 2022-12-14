const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000
const blogRoutes= require("./routes/blogRoutes")
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

app.set("view engine", "ejs");
//mongoose and mongo sandbox routes
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
app.use("/blogs",blogRoutes)

//404 page
app.use((req, res) => {
  // res.status(400).sendFile("./views/404.html",{ root : __dirname })
  res.status(404).render("404", { title: "404" });
});

console.log("server is listening on port " + port);
