const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() 
    ),
    transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ 
    filename: path.join(logDirectory, 'combined.log'), 
    maxsize: 10000000, 
    }) 
]
});

module.exports = logger;
