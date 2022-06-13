require('dotenv').config();
const uuid = require('uuid');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const model = require('../models/auth.model');

async function addUser(req, res) {
    const userInput = req.body;
    if (!isValid(userInput)) {
        res.status(400).json({
            error: 'Data is invalid.',
            message: 'Check property names, their data types and values.',
        });
        return;
    }

    const { name, family_name, email, password } = userInput;
    const isExisting = await model.getByEmail(email) !== undefined;
    if (isExisting) {
        res.status(400).send({
            error: 'This email is already registered.'
        });
        return;
    }

    const newUser = {
        id: uuid.v4(),
        name: name.toLowerCase(),
        family_name: family_name.toLowerCase(),
        email: email.toLowerCase(),
        password: md5(password)
    }
    const result = await model.add(newUser);
    res.status(201).send(result);
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({
            error: 'Username and password are required.'
        });
        return;
    }

    const matchedUser = await model.getPasswordByEmail(email);
    const hashedPassword = md5(password);
    if (!matchedUser || matchedUser.password !== hashedPassword) {
        res.status(404).send({
            error: 'The email address or password is incorrect.' 
        });
        return;
    }

    const { id } = await model.getByEmail(email);
    if (!id) {
        res.status(500).send({
            error: 'Something went wrong on the server' 
        });
        return;
    }
    const token = jwt.sign({
        id,
        email
    }, 
        process.env.SECRET_KEY, 
        { expiresIn: process.env.TOKEN_DURATION || '30m' }
    );
    res.json({ token });
}

function isValid(target) {
    const emailRegex = new RegExp('' +
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))/.source +
        /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source
    );
    // At least one uppercase, one special character, one number,
    // minimum 8 but maximum 10
    const passwordRegex = new RegExp('' +
        /^(?=.*[A-Z])(?=.*\d)/.source +
        /(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,10}$/.source
    );
    const properties = {
        name: 'string',
        family_name: 'string',
        email: 'string',
        password: 'string',
    };
    const isValidType = Object.keys(target).every(key => 
        properties.hasOwnProperty(key) &&
        target[key] !== '' &&
        typeof target[key] === properties[key]
    );
    const isValidEmail = emailRegex.test(target.email);
    const isValidPassword = passwordRegex.test(target.password);
    if (!isValidType || !isValidEmail || !isValidPassword) return false;
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