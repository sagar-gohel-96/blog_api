const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    case "/about-me":
      // res.setHeader({Location : '/about'});
      res.writeHead(301, { Location: "/about" });
      res.end();
      break;
    default:
      path += "404.html";
      break;
  } 
  // res.setHeader({'Content-Type' : 'text/html'});
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    else {
      res.end(data);
    }
  });
});
server.listen(3000, "localhost", () => {
  console.log("server listening on port 3000");
});
