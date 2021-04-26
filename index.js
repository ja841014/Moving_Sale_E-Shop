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


// const connection = mysql.createConnection({
//     // '192.168.12.128', 
//     // '192.168.2.129'
//     host: '192.168.2.129',
//     user: 'root',
//     password: '1',
//     database: 'project',
//     multipleStatements: true
// });

// graphql thing
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs')
const { assertResolversPresent, makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = readFileSync('./schema.graphql').toString('utf-8')
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields:  'warn',
    requireResolversToMatchSchema: 'warn'
  },
  typeDefs
});



const app = express();
// let express can use the public folder directly  https://expressjs.com/zh-tw/starter/static-files.html
app.use(express.static('public'));

app.use('/graphql', graphqlHTTP(async (req) => {
    return {
      schema,
      graphiql: true,
      context: {
        req,
        db: await connection.promise(),
        userCache: {},
        productCache: {}
      }
    };
  }));



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


    // try {
    //   const q = 'INSERT INTO image(filepath, mimetype, filesize) VALUES (?, ?, ?); INSERT INTO user (first_name, last_name, avatar_pic_id) VALUES (?, ?, LAST_INSERT_ID())';
    //   //mimetype: file type
    //   const d = [req.file.filename, req.file.mimetype, req.file.size, req.body.first_name, req.body.last_name];

    //   await connection.promise().query(q, d);
    // } catch (err) {
    //   console.error('Error', err);
    //   return next();
    // }


});

// Show products
app.get('/products', (req, res, next) => {
    res.sendFile(__dirname+'/views/products.html');

});

// Product Detail




// Profile
// app.get('/profile', (req, res, next) => {
//     res.sendFile(__dirname+'/views/profile.html');

// });

// go to login page
// app.get('/login', (req, res)=> {
//     res.sendFile(__dirname+'/views/login.html');
// })
// go to register page
// app.get('/register', (req, res)=> {
//     res.sendFile(__dirname+'/views/register.html');
// })

// user submit the form will come to here to do something
// app.post('/register', async (req,res, next) => {
//     try{
//         const {email, username, password } = req.body;

//     }
//     catch (e){
//         console.log("error:", e);
//     }
// });
// singup

// cart








app.listen(3000);
// console.log('GraphQL API server running at http://localhost:3000/graphql');





// upload.array('image') 已經把image傳到cloudinary 
// app.post('/products', upload.array('image'), async (req, res, next) => {
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