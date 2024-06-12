const {format} = require('date-fns');
const path = require('path');
const {v4 : uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = async (msg, logName) => {         //logging date and time of Events
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`       //to get unique id for each log event
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {      //in case of logs directory doesn't exist, it creates the directory
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents
//exporting this custom module