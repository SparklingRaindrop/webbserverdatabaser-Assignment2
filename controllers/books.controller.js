const model = require('../models/books.model');
const uuid = require('uuid');

function getAllBooks(_, res) {
    const result = model.getAll();
    res.send(result);
}

function getBook(req, res) {
    const result = model.getById(req.params.id);
    res.send(result);
}

function addBook(req, res) {
    //TODO HERE: check if the data is empty
    let newBook = req.body;

    if (!isValid(newBook)) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }

    newBook = {
        id: uuid.v4(),
        ...newBook
    };
    model.add(newBook);
    res.status(201).send(newBook);
}

function replaceBook(req, res) {
    const newBook = req.body;

    if (!isValid(newBook)) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }

    model.replace(req.params.id, newBook);
    res.send(newBook, { message: `Data(ID:${id}) is successfully updated.` });
}

function updateBook(req, res) {
    const newData = req.body;
    const id = req.params.id;
    if (!isValid(newData, 'patch')) {
        res.status(400).json({
            error: 'Data has wrong structure. Check properties and its data type.'
        });
        return;
    }

    model.update(id, newData);
    res.send(newData, { message: `Data(ID:${id}) is successfully updated.` });
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