// this file is a generic logging function that will log to the given file
import fs from 'fs';
import path from 'path';

const logFile = process.env.LOG_FILE || false
const logLevel = Number(process.env.LOG_LEVEL) || 0;

export function logToFile(value: any, level: number, name?: string, info?: string){
    // appends the value to the log file

    // if logLevel greater or equal to passed level, log with timestamp
    if (logLevel >= level && logFile) {
        const timestamp = new Date().toISOString();
        const log = `${timestamp} ${name ? name : ''} ${value} ${info ? info : ''}\n`;
        fs.appendFileSync(logFile, log);
    }
}