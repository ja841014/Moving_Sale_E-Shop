"use strict"
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const ejsMate = require('ejs-mate');

const express = require('express');

const path = require('path');

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
});

// Add Product 
app.get('/products/new', (req, res, next) => {
    res.render('add');
});
// post a new product
app.post('/products/new', upload.single('product_photo'), async (req, res, next) => {
    try {
        const q = 'INSERT INTO product(seller, category, productName, price, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const d = [ String(req.user._id), req.body.category, req.body.product_name, req.body.price, req.body.boughtDate, req.file.path, req.body.look_like, req.body.numberOfProduct, req.body.descript];

        await connection.promise().query(q, d);
    } catch (err) {
      console.error('Errorrrr', err);
    }
    req.flash('success', 'Successfully add a new product');
    res.redirect('/products/new');
});

app.get('/products/new/:productId', jsonBodyParser, async (req, res, next) => {
  
  res.render('productDetail')

});




// Show products
app.get('/products', async (req, res, next) => {
  res.render("products")
});


// checkout
app.post('/cart', jsonBodyParser, async(req, res, next) => {
    
    for(let i = 0; i < req.body.length; i++) {
        const curUser = req.user._id

        const {productName, productId, price, sellerName, number } = req.body[i];

        const q = 'SELECT numberOfProduct FROM product WHERE product_id =?';
        const d  = [productId];
        const [rows, fields] = await connection.promise().query(q, d);


        const numberOfProduct = rows[0].numberOfProduct - number;

        const updateq = 'UPDATE product SET numberOfProduct=?  WHERE product_id=?';
        const updated = [numberOfProduct, productId];
        const [rowsUPDATE, fieldsUPDATE] = await connection.promise().query(updateq, updated);

        const insertq = 'INSERT INTO history (buyer, seller, product_name, num, price) VALUES (?, ?, ?, ?, ?)';
        const insertd = [String(curUser), String(sellerName), productName, number, Number(price)*Number(number)];
        const [rowsInsert, fieldsInsert] = await connection.promise().query(insertq, insertd);
    }
    
}) 


// Profile
app.get('/profile', (req, res, next) => {
    res.render('profile')
})

// user route
// they are in routes folder
app.use('/', userRoutes);




app.listen(3000);
console.log('GraphQL API server running at http://localhost:3000/graphql');


