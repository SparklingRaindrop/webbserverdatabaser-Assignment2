const express = require('express');
const morgan = require('morgan');
const logWriter = require('./js/logWriter');

const bodyParser = require('body-parser');
const booksRouter = require('./routers/books.router');
const authRouter = require('./routers/auth.router');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(logWriter());

app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    `Server is running on port ${PORT}`
});