# Library API
- An API that stores data in a SQL database(SQLite)
- Written in Node.js
- Can only be accessed from http://localhost:3000
## How to use it
- You need Node.js in order to run this app.

- To run server  
Run `node server.js` or `npm run start` in the terminal.  
Then server will run.
Default port number is 4500. (Read more in .env file section) 

## .env file
There are two environment variables in **.env.example** .
- **SECRET_KEY**  
A key that is used to generate [JSON Web Token (JWT)](https://jwt.io/)  
Do not set anything that makes sense.  
- **PORT**  
Port number that server runs on. This is optional.
Default port number is 4500.
- **TOKEN_DURATION**  
Duration for token. Details at [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)  
Default duration is 30 minutes.

## server.log
When the server runs for the first time, server.log file will be created automatically.  
For every request the server receives timestamp, request method, route and status will be saved. 
## Endpoints
There are four routers.
* /books
    - [GET /books and /books/:id](#get-books)
    - [PATCH or PUT /books](#patch-or-put-booksid)
    - [POST /books](#post-books)
    - [DELETE /books](#delete-booksid)
* /auth
    -  [POST /auth/register](#post-authregister)
    -  [POST /auth/login](#post-authlogin)
* /users
    - [POST /users/lend](#post-userslend)
    - [POST /users/return](#post-usersreturn)
* /me
    - [GET /me](#me-me)
### **<mark>GET</mark> /books/**
Calling API without an ID will return a list of all the books from the database.

| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| title  | Title of the book | string
| isbn | ISBN number (10 or 13 digits) | string
| author | Author of the book | string
| publish_year | Publish year | number
| publisher | Publisher of the book | string
| language | Language that book is written in | string
| genre | Genre | string
| own (*without ID) | Total number of copies that the library own | number
| available (*without ID) | Total number of copies that is available to lend | number
| available (*with ID) | If it is available to lend | boolean
| return_date (*with ID) | Returning date when available is false | string

**Get all the books**  
Getting all the titles
```javascript
fetch('http://localhost:5000/books/');
```
**Result**
```json
[
    {
        "title":"Harry Potter and the Chamber of Secrets",
        "isbn":"0747538492",
        "author":"J. K. Rowling",
        "publish_year":1998,
        "publisher":"Bloomsbury",
        "language":"en",
        "genre":"fantasy",
        "own":2,
        "available":2
    },
    {
        "title": "Harry Potter and the Deathly Hallows",
        "isbn": "0545010225",
        "author": "J. K. Rowling",
        "publish_year": 2007,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy",
        "own": 4,
        "available": 4
    },
    {
        "title": "Harry Potter and the Goblet of Fire",
        "isbn": "074754624X",
        "author": "J. K. Rowling",
        "publish_year": 2000,
        "publisher": "Bloomsbury",
        "language": "en",
        "genre": "fantasy",
        "own": 3,
        "available": 2
    },
]
```
  
**Get one book**  
Get one specific book with its ID
```javascript
fetch('http://localhost:5000/books/:id');
```
**Result**
```json
{
    "id": 11,
    "title": "Harry Potter and the Deathly Hallows",
    "isbn": "0545010225",
    "author": "J. K. Rowling",
    "publish_year": 2007,
    "publisher": "Bloomsbury",
    "language": "en",
    "genre": "fantasy",
    "available": true,
    "return_date": "N/A"
}
```
  
---
  
### **<mark>POST</mark> /books/**
Adding a new book to the database.

| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| title*  | Title of the book | string
| isbn* | ISBN number (10 or 13 digits) | string
| author* | Author of the book | string
| publish_year | Publish year | number
| publisher | Publisher of the book | string
| language | Language that book is written in | string
| genre* | Genre | string
  
*Can not be empty

```javascript
fetch('http://localhost:5000/books/', {
    method: 'POST',
    body: JSON.stringify(
        {
            title: "The Lord of the Rings",
            isbn: "9788845292613",
            author: "J. R. R. Tolkien",
            publish_year: 1954,
            publisher: "Allen & Unwin",
            genre: "fantasy",
            language: "en"
        }
    ),
    headers: {
        'Content-Type': 'application/json',
    }
});
```
**Result**
```json
{
    "id": 60,
    "title": "The Lord of the Rings",
    "isbn": "9788845292613",
    "author": "J. R. R. Tolkien",
    "publish_year": 1954,
    "publisher": "Allen & Unwin",
    "language": "en",
    "genre": "fantasy"
}
```
  
---
  
### **<mark>PATCH or PUT</mark> /books/:ID**
Updating a book on the database. ID is immutable.

| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| title*  | Title of the book | string
| isbn* | ISBN number (10 or 13 digits) | string
| author* | Author of the book | string
| publish_year | Publish year | number
| publisher | Publisher of the book | string
| language | Language that book is written in | string
| genre* | Genre | string
  
*Can not be empty string
  
```javascript
fetch('http://localhost:5000/books/60', {
    method: 'PATCH',
    body: JSON.stringify(
        {
            language: 'sv',
            genre: 'novel'
        }
    ),
    headers: {
        'Content-Type': 'application/json',
    }
});
```
  
```javascript
fetch('http://localhost:5000/books/60', {
    method: 'PUT',
    body: JSON.stringify(
        {
            title: "The Lord of the Rings",
            isbn: "9788845292613",
            author: "J. R. R. Tolkien",
            publish_year: 1954,
            publisher: "Allen & Unwin",
            language: "en",
            genre: "fantasy"
        }
    ),
    headers: {
        'Content-Type': 'application/json',
    }
});
```
**Result**
```json
{
    "id": 60,
    "title": "The Lord of the Rings",
    "isbn": "9788845292613",
    "author": "J. R. R. Tolkien",
    "publish_year": 1954,
    "publisher": "Allen & Unwin",
    "language": "en",
    "genre": "fantasy"
}
```
  
---
  
### **<mark>DELETE</mark> /books/:ID**
Deleting a task on the database.

```javascript
fetch('http://localhost:5000/books/60', {
    method: 'DELETE'
});
```
**Result**
```json
{
    "message":"Book(ID: 60) is successfully removed."
}
```
  
---
  
### **<mark>POST</mark> /auth/register**
Register a new user.
| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| id  | user id | string
| name  | Name | string
| family_name | Family name | string
| email | e-mail address (must be unique) | string
| password | password* | string
  
*At least one uppercase, one special character, one number, minimum 8 and maximum 10
```javascript
fetch('http://localhost:5000/auth/register', {
    method: 'POST',
    body: JSON.stringify(
        {
            "name": "John",
            "family_name": "Doe",
            "email": "jdoe@test123.com",
            "password": "Test123!"
        }
    ),
    headers: {
        'Content-Type': 'application/json',
    }
});
```
**Result**
```json
{
    "id": "395900ee-8cc6-450b-a6ce-64534771b00e",
    "name": "john",
    "family_name": "doe",
    "email": "jdoe@test123.com"
}
```
  
---
  
### **<mark>POST</mark> /auth/login**
User login and get token in return.
| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| email | e-mail address | string
| password | password | string

```javascript
fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    body: JSON.stringify(
        {
            "email": "jdoe@test123.com",
            "password": "Test123!"
        }
    ),
    headers: {
        'Content-Type': 'application/json',
    }
});
```
**Result**
```json
{
    "token": "eyJhbGciOiJ....(token continues)"
}
```
  
---
  
### **<mark>POST</mark> /users/lend**
Borrow a book. (authorized route)
| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| bookId  | book ID | number

```javascript
fetch('http://localhost:5000/users/lend', {
    method: 'POST',
    body: JSON.stringify(
        {
            "bookId": 30
        }
    ),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJ....(token continues)',
    }
});
```
**Result**
```json
{
    "message":"Book(ID:30) is checked out successfully."
}
```
  
---
  
### **<mark>POST</mark> /users/return**
Return a book. (authorized route)
| Name      | Description | Type   |
| ----------- | ----------- | ----- |
| bookId  | book ID | number

```javascript
fetch('http://localhost:5000/users/return', {
    method: 'POST',
    body: JSON.stringify(
        {
            "bookId": 30
        }
    ),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJ....(token continues)',
    }
});
```
**Result**
```json
{
    "message":"Book(ID: 30) is successfully returned."
}
```
  
---
  
### **<mark>POST</mark> /me**
Get registered information and borrowing list. (authorized route)

```javascript
fetch('http://localhost:5000/me', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJ....(token continues)',
    }
});
```
**Result**
```json
{
    "user": {
        "id": "395900ee-8cc6-450b-a6ce-64534771b00e",
        "name": "john",
        "family_name": "doe",
        "email": "jdoe@test123.com"
    },
    "borrowing": [
        {
            "borrowing_id": 8,
            "date_borrowed": "2022/06/13",
            "date_return": "2022/06/27",
            "book_id": 12,
            "title": "The Lord of the Rings"
        },
        {
            "borrowing_id": 9,
            "date_borrowed": "2022/06/13",
            "date_return": "2022/06/27",
            "book_id": 11,
            "title": "Harry Potter and the Deathly Hallows"
        }
    ]
}
```