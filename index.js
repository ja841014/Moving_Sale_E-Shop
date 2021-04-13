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
// 讓express可以去看到public裡面的東西
// https://expressjs.com/zh-tw/starter/static-files.html
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


app.post('/product', upload.array('image'), async (req, res, next) => {
    try {
        const productImage = req.files.map(f => ({
            url: f.path,
            filename: f.filename
        }));

        if (productImage.length == 3) {
            const q = 'INSERT INTO seller(file_name_1, url_1, file_name_2, url_2, file_name_3, url_3) VALUES (?, ?, ?, ?, ?, ?);';
            const d = [productImage[0].filename, productImage[0].url, productImage[1].filename, productImage[1].url, productImage[2].filename, productImage[2].url];
            await connection.promise().query(q, d);
        } else if (productImage.length == 2) {
            const q = 'INSERT INTO seller(file_name_1, url_1, file_name_2, url_2) VALUES (?, ?, ?, ?);';
            const d = [productImage[0].filename, productImage[0].url, productImage[1].filename, productImage[1].url];
            await connection.promise().query(q, d);
        }



        console.log(productImage[0]);
    } catch (err) {
        console.log('Error: ', err);
        return next();
    }

    next();
});


app.get('/testget', async (req,res, next) => {
    const q = 'SELECT s.seller_id, s.file_name_1, s.url_1, s.file_name_2, s.url_2, s.file_name_3, s.url_3 FROM seller AS s ';
    const [rows, fields] = await connection.promise().query(q);
    const tmp = rows.map(({seller_id, file_name_1, url_1, file_name_2, url_2, file_name_3, url_3}) => ({
        seller_id,
        file_name_1,
        url_1,
        file_name_2 : file_name_2 != null ? file_name_2 : null,
        url_2: url_2 != null ? url_2 : null,
        file_name_3: file_name_3 != null ? file_name_3 : null,
        url_3 : url_3 != null ? url_3 : null
        
        
        
        // email_address: email,
        // first_name,
        // last_name,
        // user_id,
        // avatar_pic_url: filepath ? `/assets/${filepath}` : null
    }));
    res.render("gettest", { data: JSON.stringify(tmp) });

    // res.json(rows.map(({seller_id, file_name_1, url_1, file_name_2, url_2, file_name_3, url_3}) => ({
    //     seller_id,
    //     file_name_1,
    //     url_1,
    //     file_name_2 : file_name_2 != null ? file_name_2 : null,
    //     url_2: url_2 != null ? url_2 : null,
    //     file_name_3: file_name_3 != null ? file_name_3 : null,
    //     url_3 : url_3 != null ? url_3 : null
        
        
        
    //     // email_address: email,
    //     // first_name,
    //     // last_name,
    //     // user_id,
    //     // avatar_pic_url: filepath ? `/assets/${filepath}` : null
    // })));

    next();
} ) 


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