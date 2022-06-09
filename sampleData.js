const sampleBooks = [
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "isbn": "0-7475-3269-9",
        "author": "J. K. Rowling",
        "publish_year": 1997,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Chamber of Secrets",
        "isbn": "0-7475-3849-2",
        "author": "J. K. Rowling",
        "publish_year": 1998,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Prisoner of Azkaban",
        "isbn": "0-7475-4215-5",
        "author": "J. K. Rowling",
        "publish_year": 1999,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Goblet of Fire",
        "isbn": "0-7475-4624-X",
        "author": "J. K. Rowling",
        "publish_year": 2000,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Order of the Phoenix",
        "isbn": "0-7475-5100-6",
        "author": "J. K. Rowling",
        "publish_year": 2003,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Half-Blood Prince",
        "isbn": "0-7475-8108-8",
        "author": "J. K. Rowling",
        "publish_year": 2005,
        "publisher": "Bloomsbury"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury"
    }
];

async function addSampleBooks(db) {
    const existingData = await new Promise ((resolve, reject) => {
        db.all('SELECT * from Book', (error, rows) => {
            if (error) {
                console.error(error.message);
                reject();
            }
            resolve(rows);
        });
    });

    if (existingData.length > 0) {
        return;
    }

    const query = 
        'INSERT INTO Book (title, isbn, author, publish_year, publisher)' +
        'VALUES (?, ?, ?, ?, ?)';
        
    const promises = sampleBooks.map(book => {
        const { title, isbn, author, publish_year, publisher } = book;
        return new Promise ((resolve, reject) => {
            db.run(query, [title, isbn, author, publish_year, publisher], (error) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                resolve();
            });
        });
    });

    Promise.all(promises).then(() => 
        console.log('\x1b[36m%s\x1b[0m', 'Sample data is added.')
    );
}

module.exports = addSampleBooks;