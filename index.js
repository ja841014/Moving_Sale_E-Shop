"use strict"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const ejsMate = require('ejs-mate');

const express = require('express');

const path = require('path');

// const mysql = require('mysql2');
const {connection} = require("./database");

const multer = require('multer')
const {storage} = require('./cloudinary')
const upload = multer({storage})

const userRoutes = require('./routes/users')

/// for authentication ///
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require("body-parser")
const LocalStrategy = require("passport-local")

const User = require("./models/user");

const MongoDBStore = require("connect-mongo")(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/project';





///////////////////
const jsonBodyParser = bodyParser.json();
///////////////////





// project db name
// 'mongodb://localhost:27017/project'
mongoose.connect(dbUrl, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});
const db = mongoose.connection;
// connect fail
db.on("error", console.error.bind(console, "connection error"));
// connect sucessful
db.once('open', () => console.log('Connected to MongoDB')); 

const secret = process.env.SECRET || 'sould be a good secret'

// use mongo to help us store session
const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function(e) {
    console.log("SESSION STORE ERROR", e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

//////////////////////////


const app = express();
// let express can use the public folder directly  https://expressjs.com/zh-tw/starter/static-files.html
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

/// authentication part ///
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {

    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//////////////////////////////////////////

/////////////////////////
///// graphql thing /////
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

app.use('/graphql', graphqlHTTP(async (req) => {
    return {
      schema,
      graphiql: true,
      context: {
        req,
        db: await connection.promise(),
        userCache: {},
        productCache: {},
        historyCache: {}
      }
    };
  }));
/////////////////////
/////////////////////

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

//if put in front of graphql route will break grpahql//
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/home', (req, res, next) => {
    res.render('home');
});

// Introduce our website
app.get('/about', (req, res, next) => {
    res.render('about')
    // res.sendFile(__dirname+'/views/about.html');
});

// Add Product 
app.get('/products/new', (req, res, next) => {
    res.sendFile(__dirname+'/views/add.html');
});

app.post('/products/new', upload.single('product_photo'), async (req, res, next) => {
  console.log(req.user)
    try {

        const q = 'INSERT INTO product(seller, category, productName, price, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const d = [ String(req.user), req.body.category,req.body.product_name, req.body.price, req.body.boughtDate, req.file.path, req.body.look_like, req.body.numberOfProduct, req.body.descript];

        await connection.promise().query(q, d);
    } catch (err) {
      console.error('Errorrrr', err);
    //   return next();
    }
    res.redirect('/products/new');
});

app.get('/products/new/:productId', jsonBodyParser, async (req, res, next) => {
  
  // console.log(req.params)
  res.render('productDetail')
//   res.sendFile(__dirname+'/views/productDetail.html');

});




// Show products
app.get('/products', async (req, res, next) => {
  res.sendFile(__dirname+'/views/products.html');
});

app.get('/products/clothes', async (req, res, next) => {
  res.sendFile(__dirname+'/views/productsClothes.html');
});

app.get('/products/furnitures', async (req, res, next) => {
  res.sendFile(__dirname+'/views/productsFurnitures.html');
});


app.post('/cart', jsonBodyParser, async(req, res, next) => {
    
    for(let i = 0; i < req.body.length; i++) {
        const curUser = req.user._id
        console.log("user:", curUser);

        const {productName, productId, price, sellerName, number } = req.body[i];
        console.log("productId", productId)

        const q = 'SELECT numberOfProduct FROM product WHERE product_id =?';
        const d  = [productId];
        const [rows, fields] = await connection.promise().query(q, d);


        const numberOfProduct = rows[0].numberOfProduct - number;
        console.log("numberOfProduct", numberOfProduct);

        const updateq = 'UPDATE product SET numberOfProduct=?  WHERE product_id=?';
        const updated = [numberOfProduct, productId];
        const [rowsUPDATE, fieldsUPDATE] = await connection.promise().query(updateq, updated);
        console.log("rowsUPDATE:", rowsUPDATE)

        const insertq = 'INSERT INTO history (buyer, seller, product_name, num, price) VALUES (?, ?, ?, ?, ?)';
        const insertd = [String(curUser), String(sellerName), productName, number, Number(price)*Number(number)];
        const [rowsInsert, fieldsInsert] = await connection.promise().query(insertq, insertd);

        
        console.log("DONE")
    }
    // window.localStorage.removeItem('items')
    // console.log(req);
    // try {
    //     const q = 'UPDATE product SET numberOfProduct = ? WHERE seller = ?';
    //     const d = [req.body.email_address, req.params.userId];
    //     const [rows, fields] = await connection.promise().query(q, d);
    
    //     res.status(204).end();
    
    //   } catch(err) {
    //     console.error('Error', err);
    //     res.status(500).end(err.message);
    //   }
}) 

// fetch history
// app.get('/history', jsonBodyParser, async(req, res, next) => {
//     console.log("history", req.body);
//     const buyer = req.body.userID;

//     const q = 'SELECT product_id FROM history WHERE buyer =?';
//     const d  = [buyer];
//     const [rows, fields] = await connection.promise().query(q, d);
//     const productName = [];
//     const fieldsproduct = [];
//     for(let i = 0 ;i < rows.length; i++) {
//         const qproduct = 'SELECT productName FROM product WHERE product_id =?';
//         const dproduct  = [rows[i].product_id];
//         [productName, fieldsproduct] = await connection.promise().query(qproduct, dproduct);
//     }
//     console.log("productName", productName);
//     res.render('profile', {productName});

// })
// Profile
app.get('/profile', (req, res, next) => {
    console.log(res.locals.currentUser );
    res.render('profile')
    // res.sendFile(__dirname+'/views/profile.html');
})

// user route
// they are in routes folder
app.use('/', userRoutes);




app.listen(3000);
console.log('GraphQL API server running at http://localhost:3000/graphql');





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