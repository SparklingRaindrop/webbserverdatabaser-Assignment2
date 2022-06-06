const onFinished = require('on-finished');
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

        onFinished(res, async (err, res) => {
            const logData = `[${date}] "${method} ${route}" ${res.statusCode}\n`;

            writeFile(LOG_FILE, logData, {
                encoding: 'utf8',
                flag: 'a',
            });
        });

        next();
    }
}

module.exports = logWriter;