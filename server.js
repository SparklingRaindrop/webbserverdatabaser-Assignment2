const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logWriter = require('./middlewares/logWriter');

const bodyParser = require('body-parser');
const booksRouter = require('./routers/books.router');
const authRouter = require('./routers/auth.router');
const usersRouter = require('./routers/users.router');
const meRouter = require('./routers/me.router');

const PORT = process.env.PORT || 4500;
const CORS_OPTION = {
    origin: 'http://localhost:3000',
};

const app = express();
app.use(morgan('tiny'));
app.use(logWriter());

app.use(cors(CORS_OPTION));
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/me', meRouter);

app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m', `Server is running on port ${PORT}`));