require('dotenv').config();
const uuid = require('uuid');
const md5 = require('md5');
const ms = require('ms');
const jwt = require('jsonwebtoken');
const model = require('../models/auth.model');

const TOKEN_DURATION = '10h';

async function addUser(req, res) {
    if (!isValid(req.body)) {
        res.status(400).json({
            error: 'Data has wrong structure or wrong value. Check properties and its data type.'
        });
        return;
    }
    const {name, familyName, email, password} = req.body;
    const isExisting = await model.getByEmail(email) !== undefined;
    if (isExisting) {
        res.status(400).send('This email is already registered.');
        return;
    }

    const newUser = {
        id: uuid.v4(),
        name,
        familyName,
        email,
        password: md5(password)
    }
    await model.add(newUser);
    res.status(201).send(newUser);
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send('Username and password are required.');
        return;
    }

    const matchedUser = await model.getByEmail(email);
    if (!matchedUser) {
        res.status(404).send('User doesn\'t exist.');
        return;
    }

    const hashedPassword = md5(password);
    if (matchedUser.password !== hashedPassword) {
        res.status(400).send('Password is incorrect.');
        return;
    }

    const { id } = matchedUser;
    const token = jwt.sign({
        id,
        email
    }, 
        process.env.SECRET_KEY, 
        { expiresIn: ms(TOKEN_DURATION) }
    );
    res.json(token);
}

function isValid(target) {
    const emailRegex = new RegExp(
        '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|' +
        '(".+"))@' +
        '((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|' +
        '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    );

    const properties = {
        name: 'string',
        familyName: 'string',
        email: 'string',
        password: 'string',
    };

    const isValidType = Object.keys(target).every(key => 
        properties.hasOwnProperty(key) &&
        target[key] !== '' &&
        typeof target[key] === properties[key]
    );
    if (!isValidType || target.email.match(emailRegex)) return false;
    return Object.keys(properties).length === Object.keys(target).length;
}

// For testing purpose
async function getAllUsers(req, res) {
    const result = await model.getAllUsers();
    res.json(result);
}

module.exports = {
    addUser,
    loginUser,
    getAllUsers
}