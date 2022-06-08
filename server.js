const express = require('express');
const morgan = require('morgan');
const logWriter = require('./middlewares/logWriter');

const bodyParser = require('body-parser');
const booksRouter = require('./routers/books.router');
const authRouter = require('./routers/auth.router');
const usersRouter = require('./routers/users.router');

const PORT = process.env.PORT || 4500;

const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(logWriter());

app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));