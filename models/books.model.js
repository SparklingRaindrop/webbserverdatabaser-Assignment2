let books = [{
    id: '1',
    title: 'Harry Potter 1'
}, {
    id: '2',
    title: 'Harry Potter 2'
}];

/*
    title: string,
    isbn: string,
    author: string,
    publishYear: int,
    publisher: string,
*/

function getAll() {
    return books;
}

function getById(id) {
    const result = books.find(book => book.id = id);
    return result;
}

function add(newData) {
    books.push(newData);
}

function replace(id, newData) {
    const targetIndex = books.findIndex(book => book.id === id);
    // if (targetIndex < 0) return 
    books[targetIndex] = newData;
}

function update(id, newData) {
    const targetIndex = books.findIndex(book => book.id === id);
    // if (targetIndex < 0) return 
    books[targetIndex] = {
        ...books[targetIndex],
        ...newData
    };
}

function remove(id) {
    const newBooks = books.filter(book => book.id !== id);
    books = newBooks;
}

module.exports = {
    getAll,
    getById,
    add,
    replace,
    update,
    remove
};