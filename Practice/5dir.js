const fs = require("fs");

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    //creating directory
    if (err) throw err;
    console.log("Directory created");
  });
  console.log('Hey');
}
