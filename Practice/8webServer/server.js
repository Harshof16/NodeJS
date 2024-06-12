const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require('./logEvents');   
const EventEmitter = require("events");

//initialize object
const myEmitter = new EventEmitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))

const PORT = process.env.PORT || 3500; //to host this server

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 400 : 200, {
      "Content-Type": contentType,
    });
    contentType === "application/json" ? JSON.stringify(data) : null;
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name} : ${err.message}`, "errLog.txt");

    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  //to create an HTTP server
  console.log(req.url, res.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // if(req.url === '/' || req.url === 'index.html') {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type','text/html');
  //     path = path.join(__dirname, 'views', 'index.html');     //fetching index.html file to read from views folder
  //     fs.readFile(path, 'utf8', (err, data) => {
  //         res.end(data);
  //     })
  // }

  //   switch (req.url) {
  //     case "/":
  //       res.statusCode = 200;
  //       path = path.join(__dirname, "views", "index.html"); //fetching index.html file to read from views folder
  //       fs.readFile(path, "utf8", (err, data) => {
  //         res.end(data);
  //       });
  //       break;
  //   }

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/" //it is sub directory
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes the .html extension not required in browser
  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      //redirect
      case "old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
      //serve a 404 response
    }
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

