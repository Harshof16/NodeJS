//installed nodemon as a dev dependency by 'npm i nodemon -D'
//initializing npm by 'npm init' or 'npm init -y'
//modifying start and dev in scripts

const {format} = require('date-fns')
const {v4: uuid} = require('uuid')      // commonJs syntax
// import {v4 as uuid} from uuid       //E6 module syntax

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());        //for generating timestamp and other options