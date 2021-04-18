"use strict"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');

const mysql = require('mysql2');

const multer = require('multer')
const {storage} = require('./cloudinary')
const upload = multer({storage})


const connection = mysql.createConnection({
    host: '192.168.12.128',
    user: 'root',
    password: '1',
    database: 'user',
    multipleStatements: true
});


const app = express();
// let express can use the public folder directly  https://expressjs.com/zh-tw/starter/static-files.html
app.use(express.static('public'));


app.get('/home', (req, res, next) => {
    
    console.log(__dirname);
    res.sendFile(__dirname+'/views/home.html');

    // res.render('/home');
});

// Introduce our website
app.get('/about', (req, res, next) => {
    res.sendFile(__dirname+'/views/about.html');
    // res.render('about');
    // next();
});

// Add Product
app.get('/products/new', (req, res, next) => {
    res.sendFile(__dirname+'/views/add.html');

});

// Show products
app.get('/products', (req, res, next) => {
    res.sendFile(__dirname+'/views/products.html');

});

// Product Detail












app.listen(3000);





// upload.array('image') 已經把image傳到cloudinary 
// app.post('/product', upload.array('image'), async (req, res, next) => {
//     try {
//         // upload 後可能有1~3張圖片, 用這樣的方式把這兩個infomation取下來  url = file.path filename = f.filename
//         // productImage 是一個json of array
//         const productImage = req.files.map(f => ({
//             url: f.path,
//             filename: f.filename
//         }));
//         // 這裡可能要想一下有沒有更好的寫法 看client上傳幾張照片, 資料parse到前端的時候不會因為張數而crash
//         if (productImage.length == 3) {
//             const q = 'INSERT INTO seller(file_name_1, url_1, file_name_2, url_2, file_name_3, url_3) VALUES (?, ?, ?, ?, ?, ?);';
//             const d = [productImage[0].filename, productImage[0].url, productImage[1].filename, productImage[1].url, productImage[2].filename, productImage[2].url];
//             await connection.promise().query(q, d);
//         } else if (productImage.length == 2) {
//             const q = 'INSERT INTO seller(file_name_1, url_1, file_name_2, url_2) VALUES (?, ?, ?, ?);';
//             const d = [productImage[0].filename, productImage[0].url, productImage[1].filename, productImage[1].url];
//             await connection.promise().query(q, d);
//         }



//         console.log(productImage[0]);
//     } catch (err) {
//         console.log('Error: ', err);
//         return next();
//     }
// });

// take the data from mysql
// app.get('/testget', async (req,res, next) => {
//     const q = 'SELECT s.seller_id, s.file_name_1, s.url_1, s.file_name_2, s.url_2, s.file_name_3, s.url_3 FROM seller AS s ';
//     const [rows, fields] = await connection.promise().query(q);

//     res.json(rows.map(({seller_id, file_name_1, url_1, file_name_2, url_2, file_name_3, url_3}) => ({
//         seller_id,
//         file_name_1,
//         url_1,
//         file_name_2 : file_name_2 != null ? file_name_2 : null,
//         url_2: url_2 != null ? url_2 : null,
//         file_name_3: file_name_3 != null ? file_name_3 : null,
//         url_3 : url_3 != null ? url_3 : null
        
        
        
//         // email_address: email,
//         // first_name,
//         // last_name,
//         // user_id,
//         // avatar_pic_url: filepath ? `/assets/${filepath}` : null
//     })));

//     next();
// } ) 