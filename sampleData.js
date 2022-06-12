const sampleBooks = [
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "isbn": "0-7475-3269-9",
        "author": "J. K. Rowling",
        "publish_year": 1997,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Chamber of Secrets",
        "isbn": "0-7475-3849-2",
        "author": "J. K. Rowling",
        "publish_year": 1998,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    ,
    {
        "title": "Harry Potter and the Chamber of Secrets",
        "isbn": "0-7475-3849-2",
        "author": "J. K. Rowling",
        "publish_year": 1998,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Prisoner of Azkaban",
        "isbn": "0-7475-4215-5",
        "author": "J. K. Rowling",
        "publish_year": 1999,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Goblet of Fire",
        "isbn": "0-7475-4624-X",
        "author": "J. K. Rowling",
        "publish_year": 2000,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Goblet of Fire",
        "isbn": "0-7475-4624-X",
        "author": "J. K. Rowling",
        "publish_year": 2000,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Goblet of Fire",
        "isbn": "0-7475-4624-X",
        "author": "J. K. Rowling",
        "publish_year": 2000,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Order of the Phoenix",
        "isbn": "0-7475-5100-6",
        "author": "J. K. Rowling",
        "publish_year": 2003,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Half-Blood Prince",
        "isbn": "0-7475-8108-8",
        "author": "J. K. Rowling",
        "publish_year": 2005,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0-545-01022-5",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Lord of the Rings",
        "isbn": "0007136587",
        "author": "J. R. R. Tolkien",
        "publish_year": 2002,
        "publisher": "Harpercollins Pub Ltd",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Hobbit",
        "isbn": "978-0547928227",
        "author": "J. R. R. Tolkien",
        "publish_year": 2012,
        "publisher": "Houghton Mifflin Harcourt",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Hobbit",
        "isbn": "978-0547928227",
        "author": "J. R. R. Tolkien",
        "publish_year": 2012,
        "publisher": "Houghton Mifflin Harcourt",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Hobbit",
        "isbn": "978-0547928227",
        "author": "J. R. R. Tolkien",
        "publish_year": 2012,
        "publisher": "Houghton Mifflin Harcourt",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Hobbit",
        "isbn": "978-0547928227",
        "author": "J. R. R. Tolkien",
        "publish_year": 2012,
        "publisher": "Houghton Mifflin Harcourt",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Hobbit",
        "isbn": "978-0547928227",
        "author": "J. R. R. Tolkien",
        "publish_year": 2012,
        "publisher": "Houghton Mifflin Harcourt",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "The Remains of the Day",
        "isbn": "978-0679731726",
        "author": "Kazuo Ishiguro",
        "publish_year": 1990,
        "publisher": "Vintage International",
        "language": "en",
        "genre": "fiction"
    },
    {
        "title": "Kallocain",
        "isbn": "9789188275059",
        "author": "Karin Boye",
        "publish_year": 2018,
        "publisher": "Trut Publishing",
        "language": "sv",
        "genre": "science fiction"
    },
    {
        "title": "The Wonderful Adventures of Nils",
        "isbn": "978-1604596243",
        "author": "Selma Lagerlof",
        "publish_year": 2009,
        "publisher": "SMK Books",
        "language": "en",
        "genre": "children's literature"
    },
    {
        "title": "The Wonderful Adventures of Nils",
        "isbn": "978-1604596243",
        "author": "Selma Lagerlof",
        "publish_year": 2009,
        "publisher": "SMK Books",
        "language": "en",
        "genre": "children's literature"
    },
    {
        "title": "The Silmarillion",
        "isbn": "978-0-04-823139-0",
        "author": "J. R. R. Tolkien",
        "publish_year": 1977,
        "publisher": "George Allen & Unwin",
        "language": "en",
        "genre": "novel"
    },
    {
        "title": "The Fellowship of the Ring",
        "isbn": "9780048230454",
        "author": "J. R. R. Tolkien",
        "publish_year": 1954,
        "publisher": "George Allen & Unwin",
        "language": "en",
        "genre": "fantasy"
    },
    {
        "title": "Unfinished Tales of Númenor and Middle-earth",
        "isbn": "9780048231796",
        "author": "J. R. R. Tolkien",
        "publish_year": 1980,
        "publisher": "George Allen & Unwin",
        "language": "en",
        "genre": "fantasy fiction"
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
        'INSERT INTO Book (title, isbn, author, publish_year, publisher, language, genre)' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)';
        
    const promises = sampleBooks.map(book => {
        const { title, author, publish_year, publisher, language, genre } = book;
        const isbn = book.isbn.replaceAll('-', '');

        return new Promise ((resolve, reject) => {
            db.run(query, [title, isbn, author, publish_year, publisher, language, genre], (error) => {
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