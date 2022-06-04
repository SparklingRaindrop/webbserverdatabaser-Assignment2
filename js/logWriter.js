function logWriter() {
    return function log(req, res, next) {
        console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
        next();
    }
}

module.exports = logWriter;