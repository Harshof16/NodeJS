// const fs = require('fs');
const fsPromises = require("fs").promises;
const path = require("path");

//reading file synchronously
const fileOperations = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "lorem.txt"),
      "utf8"
    );
    await fsPromises.unlink(path.join(__dirname, "test.txt"));      //deletes this file
    await fsPromises.writeFile(path.join(__dirname, "reply.txt"), data);
    await fsPromises.appendFile(
      path.join(__dirname, "reply.txt"),
      "\n\n Nice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "reply.txt"),
      path.join(__dirname, "replyBack.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "replyBack.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOperations();

// --------------------
//will create (if file doesn't exist) and update the whole data
// fs.writeFile(path.join(__dirname, "reply.txt"), "Nice to meet you", err => {
//     if(err) throw err;
//     console.log('File is updated');

//     //append content into file
//     fs.appendFile(path.join(__dirname, "reply.txt"), "\n\Hi There", err => {
//         if(err) throw err;
//         console.log('File is created and updated');

//         fs.rename(path.join(__dirname, "reply.txt"), path.join(__dirname, "replyBack.txt"), err => {
//             if(err) throw err;
//             console.log('File is renamed');

//             fs.readFile(path.join(__dirname,'replyBack.txt'), (err, data) => {
//                 if(err) throw err;
//                 console.log(data.toString());
//             })
//             //Callback chaining - this way we're avoiding async nature but this getting too clumsy as well, to avoid this we'll be using Promises

//         })

//     })
// })
// -----------------------
//appends data into file
// fs.appendFile(path.join(__dirname, "test.txt"), "Testing file", err => {
//     if(err) throw err;
//     console.log('File is created and updated');
// })
