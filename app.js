const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const path =require("path");
app.listen(port);
//home page
app.get("/", (req, res) => {
    try{
        res.sendFile("./views/index.html",{ root : __dirname })
        // res.end();
       } catch(err) {
            console.error(err);
            res.sendStatus(500);
    }
})

// app.get('/',(req, res)=> {
//     res.sendFile(path.join(__dirname, '/views/index.html'));
//   });

//about page
app.get("/about", (req, res) => {
   try{
    res.sendFile("./views/about.html",{ root : __dirname })
    // res.end();
   } catch(err) {
        console.error(err);
        res.sendStatus(500);
}
})
// app.get('/about', (req, res) =>{
//     res.sendFile(path.join(__dirname, '/views/about.html'));
// });
app.get('/about-us',(req, res)=>{
    res.redirect("/about")
})
//404 page
app.use((req,res)=>{
    res.status(400).sendFile("./views/404.html",{ root : __dirname })
})

console.log("server is listening on port " + port);