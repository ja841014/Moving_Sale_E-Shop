"use strict"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');

const mysql = require('mysql2');

const multer = require('multer')
const {
    storage
} = require('./cloudinary')
const upload = multer({
    storage
})

const app = express();

const connection = mysql.createConnection({
    host: '192.168.2.129',
    user: 'root',
    password: '1',
    database: 'user',
    multipleStatements: true
});


// kind of template
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// 讓res.render("xxx")的時候可以去到views找對應的html
// https://expressjs.com/zh-tw/starter/static-files.html
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// home page
app.get('/home', (req, res, next) => {
    res.render('home');
    next();
});

// the page when we want add new product
app.get('/products/new', (req, res, next) => {
    res.render('new');
    next();
});


app.post('/product', upload.array('image'), (req, res, next) => {
    try {
        console.log(req.body);
    } catch (err) {
        console.log('Error: ', err);
        return next();
    }

    next();
});





app.post('/test', async (req, res, next) => {
    try {
        const q = 'INSERT INTO player(player_id, fname, lname, is_active, balance_usd, handed) VALUES (?, ?, ?, ?, ?, ?);';
        const d = [1, 'lai', 'hao', false, 10.2, "L"];
        await connection.promise().query(q, d);
    } catch (err) {
        console.log('Error: ', err);
        return next();
    }
    next();
});

app.listen(3000);

//https://stackoverflow.com/questions/45526666/are-you-able-to-use-vue-js-inside-an-ejs-file