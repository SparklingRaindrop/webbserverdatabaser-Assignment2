const model = require('../models/books.model');

const PROPERTIES = {
    title: 'string',
    isbn: 'string',
    author: 'string',
    publishYear: 'number',
    publisher: 'string',
};
const REQUIRED = ['title', 'isbn', 'author'];

async function getAllBooks(_, res) {
    const result = await model.getAll();
    const availableCount = await model.getAllAvailableBooks();
    res.json({
        available: availableCount.length,
        books: result,
    });
}

async function getBook(req, res) {
    const result = await getById(Number(req.params.id), res);
    if (!result) return;

    res.json(result);
}

async function addBook(req, res) {
    const newBook = req.body;
    const isValid = validateData(newBook, res);
    if (!isValid) return;

    await model.add(newBook);
    res.status(201).send(newBook);
}

async function updateBook(req, res) {
    const id = Number(req.params.id);
    const target = await getById(id, res);
    if (!target) return;

    const newData = req.body;
    const isValid = validateData(newData, res, req.method);
    if (!isValid) return;

    await model.update(id, newData);
    res.send({ message: `The book (ID:${id}) is successfully updated.` });
}

function removeBook(req, res) {
    const id = Number(req.params.id);
    model.remove(id);
    res.send({
        message: `Data(ID:${id}) is successfully removed.`
    });
}

async function getById(id, res) {
    const result = await model.matchBy('id', id);
    if (!result) {
        res.status(404).send({
            error: `A book with ID[${id}] was not found.`,
            message: "Ensure requested ID is correct",
        });
        return null;
    }
    return result;
}

function validateData(data, res, method) {
    if (!isValid(data, method)) {
        res.status(400).send({
            error: 'Data is invalid.',
            message: 'Check property names, their data types and values.',
        });
        return false;
    }
    return true;
}

function isValid(target, method) {
    const keys = Object.keys(target);

    // Check if the values are correct type of data. 
    const isValidType = keys.every(key => 
        PROPERTIES.hasOwnProperty(key) &&
        typeof target[key] === PROPERTIES[key]
    );
    if (!isValidType) return false;

    // Check if the required information has some data
    const targetProperties = keys.filter(key => REQUIRED.includes(key));
    if (targetProperties.length > 0) {
        const hasRequiredData = targetProperties.every(key => 
            target[key].replace(/\s+/g, '') !== ''
        );
        if (!hasRequiredData) return false;
    }

    // Check ISBN: 000-0-00000-000-0, 0-00000-000-0 or without hyphen
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    const isValidIsbn = new RegExp(isbnRegex).test(target.isbn);
    if (!isValidIsbn) return false;

    if (method === 'PATCH') return true;
    return Object.keys(PROPERTIES).length === Object.keys(target).length;
}

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    removeBook
};