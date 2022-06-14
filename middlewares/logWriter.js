const { writeFile } = require('fs/promises');

const DATE_OPTIONS = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

const LOG_FILE = './server.log';

function logWriter() {
    // Getting time when the request comes in
    const date = new Date().toLocaleDateString(undefined, DATE_OPTIONS);

    return function handleLog(req, res, next) {
        const method = req.method;
        const route = req.url;
        const start = process.hrtime.bigint();

        res.on('finish', () => {
            const end = process.hrtime.bigint();
            const speed = Number(end - start) / 1000000;
            const logData = `[${date}] "${method} ${route}" ${res.statusCode} ${res._contentLength}bytes ${speed.toFixed(2)}ms\n`;
            writeFile(LOG_FILE, logData, {
                encoding: 'utf8',
                flag: 'a',
            });
        });
        next();
    }
}

module.exports = logWriter;