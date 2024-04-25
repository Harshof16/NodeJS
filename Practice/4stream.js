//for large files
const fs = require("fs");
const path = require("path");

const readStream = fs.createReadStream(path.join(__dirname, 'lorem.txt'), {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream(
  path.join(__dirname, 'new_lorem.txt')
);

// readStream.on("data", (dataChunk) => {       //listening for the data incoming
//     writeStream.write(dataChunk)
// });

readStream.pipe(writeStream)
//Pipe function can be used to connect an input stream to an output stream
