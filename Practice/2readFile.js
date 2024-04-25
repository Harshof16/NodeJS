const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,'lorem.txt'), (err, data) => {
    if(err) throw err;
    console.log(data.toString());       //reading data
})

//async in nature, while reading file node will execute rest of the code
console.log('Reading...'); 

//exit on uncaught errors
process.on('uncaughtException', err => {
    console.log('There was an uncaught error', err);
    process.exit(1);
})