const model = require('../models/books.model');

async function getAllBooks(_, res) {
    const result = await model.getAll();
    res.send(result);
}

async function getBook(req, res) {
    const result = await model.getById(Number(req.params.id));
    res.send(result);
}

async function addBook(req, res) {
    //TODO HERE: check if the data is empty
    let newBook = req.body;

    if (!isValid(newBook)) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }
    await model.add(newBook);
    res.status(201).send(newBook);
}

async function replaceBook(req, res) {
    const newBook = req.body;

    if (!isValid(newBook)) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }
    const id = Number(req.params.id);
    await model.replace(id, newBook);
    res.send({ message: `The book (ID:${id}) is successfully updated.` });
}

async function updateBook(req, res) {
    const newData = req.body;
    const id = req.params.id;
    if (!isValid(newData, 'patch')) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }

    await model.update(id, newData);
    res.send({ message: `Data(ID:${id}) is successfully updated.` });
}

function removeBook(req, res) {
    const id = req.params.id;
    model.remove(id);
    res.send({message: `Data(ID:${id}) is successfully removed.`});
}

function isValid(target, method) {
    const properties = {
        title: 'string',
        isbn: 'string',
        author: 'string',
        publishYear: 'number',
        publisher: 'string',
    }

    const isValidType = Object.keys(target).every(key => properties.hasOwnProperty(key) &&
        typeof target[key] === properties[key]
    );
    if (!isValidType) return false;
    if (method === 'patch') return true;
    return Object.keys(properties).length === Object.keys(target).length;
}

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    replaceBook,
    updateBook,
    removeBook
};