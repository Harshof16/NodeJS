//Node runs on a server (not on a browser)
//global object instead of window object from frontend
console.log(global);

//CommonJS modules instead of ES6 modules
const os = require('os');
const path = require('path');

console.log(os.type());
console.log(os.version());
console.log(os.homedir());      //C:\Users\OBS
// console.log(os.networkInterfaces());
// console.log(os.userInfo());

console.log(__dirname);     //C:\Users\OBS\Documents\Node Dave\Practice
console.log(__filename);    //C:\Users\OBS\Documents\Node Dave\Practice\1intro.js

console.log(path.dirname(__filename));      //returns first portion of the path, C:\Users\OBS\Documents\Node Dave\Practice
console.log(path.basename(__filename));     //returns last portion of the path, 1intro.js
console.log(path.extname(__filename));      //.js

console.log(path.parse(__filename));    //above values in a single object

