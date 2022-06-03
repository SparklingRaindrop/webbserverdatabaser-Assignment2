const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const booksRouter = require('./routers/books.router');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/books', booksRouter);

app.listen(PORT, () => {
    `Server is running on port ${PORT}`
});