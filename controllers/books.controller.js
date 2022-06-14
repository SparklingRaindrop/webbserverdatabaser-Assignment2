const model = require('../models/books.model');

const PROPERTIES = {
    title: 'string',
    isbn: 'string',
    author: 'string',
    publish_year: 'number',
    publisher: 'string',
    language: 'string',
    genre: 'string'
};
const REQUIRED = ['title', 'isbn', 'author', 'genre'];

async function getAllBooks(_, res) {
    const result = await model.getAll();
    res.json(result);
}

async function getBook(req, res) {
    const id = Number(req.params.id);
    const result = await model.getById(id);
    if (!result) {
        res.status(404).send({
            error: `A book with ID[${id}] was not found.`,
            message: "Ensure requested ID is correct",
        });
        return;
    }

    // Converting to boolean data. Boolean becomes 0 or 1 in SQLite.
    if (result.available === 1) {
        result.available = true;
    } else {
        result.available = false;
    }

    res.json(result);
}

async function addBook(req, res) {
    const newBook = req.body;

    const isValid = validateData(newBook, res);
    if (!isValid) return;

    newBook.isbn.replaceAll('-', '');
    const result = await model.add(newBook);
    res.status(201).send(result);
}

async function updateBook(req, res) {
    const id = Number(req.params.id);
    const existingData = await model.getById(id);
    if (!existingData) {
        res.status(404).send({
            error: `A book with ID[${id}] was not found.`,
            message: "Ensure requested ID is correct",
        });
        return;
    }

    const newData = req.body;
    const isValid = validateData(newData, res, req.method);
    if (!isValid) return;
    if (newData.hasOwnProperty('isbn')) {
        newData.isbn = newData.isbn.replaceAll('-', '');
    }

    const result = await model.update(id, newData);
    res.send(result);
}

function removeBook(req, res) {
    const id = Number(req.params.id);
    model.remove(id);
    res.send({
        message: `Book(ID: ${id}) is successfully removed.`
    });
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

    if (target.hasOwnProperty('isbn')) {
        // Check ISBN: 000-0-00000-000-0, 0-00000-000-0 or without hyphen
        const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
        const isValidIsbn = new RegExp(isbnRegex).test(target.isbn);
        if (!isValidIsbn) return false;
    }

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