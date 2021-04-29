"use strict";

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

var ejsMate = require('ejs-mate');

var express = require('express');

var path = require('path'); // const mysql = require('mysql2');


var _require = require("./database"),
    connection = _require.connection;

var multer = require('multer');

var _require2 = require('./cloudinary'),
    storage = _require2.storage;

var upload = multer({
  storage: storage
});

var userRoutes = require('./routes/users'); /// for authentication ///


var flash = require('connect-flash');

var session = require('express-session');

var mongoose = require("mongoose");

var passport = require("passport");

var bodyParser = require("body-parser");

var LocalStrategy = require("passport-local");

var User = require("./models/user");

var MongoDBStore = require("connect-mongo")(session);

var dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/project'; // project db name
// 'mongodb://localhost:27017/project'

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var db = mongoose.connection; // connect fail

db.on("error", console.error.bind(console, "connection error")); // connect sucessful

db.once('open', function () {
  return console.log('Connected to MongoDB');
});
var secret = process.env.SECRET || 'sould be a good secret'; // use mongo to help us store session

var store = new MongoDBStore({
  url: dbUrl,
  secret: secret,
  touchAfter: 24 * 60 * 60
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
var sessionConfig = {
  store: store,
  name: 'session',
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}; //////////////////////////

var app = express(); // let express can use the public folder directly  https://expressjs.com/zh-tw/starter/static-files.html

app.use(express["static"]('public'));
app.set('views', path.join(__dirname, 'views')); /// authentication part ///

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
}); //////////////////////////////////////////
/////////////////////////
///// graphql thing /////

var _require3 = require('express-graphql'),
    graphqlHTTP = _require3.graphqlHTTP;

var _require4 = require('fs'),
    readFileSync = _require4.readFileSync;

var _require5 = require('@graphql-tools/schema'),
    assertResolversPresent = _require5.assertResolversPresent,
    makeExecutableSchema = _require5.makeExecutableSchema;

var typeDefs = readFileSync('./schema.graphql').toString('utf-8');

var resolvers = require('./resolvers');

var schema = makeExecutableSchema({
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: 'warn',
    requireResolversToMatchSchema: 'warn'
  },
  typeDefs: typeDefs
});
app.use('/graphql', graphqlHTTP(function _callee(req) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = schema;
          _context.t1 = req;
          _context.next = 4;
          return regeneratorRuntime.awrap(connection.promise());

        case 4:
          _context.t2 = _context.sent;
          _context.t3 = {};
          _context.t4 = {};
          _context.t5 = {
            req: _context.t1,
            db: _context.t2,
            userCache: _context.t3,
            productCache: _context.t4
          };
          return _context.abrupt("return", {
            schema: _context.t0,
            graphiql: true,
            context: _context.t5
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
})); /////////////////////
/////////////////////

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); //if put in front of graphql route will break grpahql//

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/home', function (req, res, next) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/home.html'); // res.render('/home');
}); // Introduce our website

app.get('/about', function (req, res, next) {
  res.sendFile(__dirname + '/views/about.html'); // res.render('about');
  // next();
}); // Add Product 

app.get('/products/new', function (req, res, next) {
  res.sendFile(__dirname + '/views/add.html');
});
app.post('/products/new', upload.single('product_photo'), function _callee2(req, res, next) {
  var q, d;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          q = 'INSERT INTO product(productName, price, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES (?, ?, ?, ?, ?, ?, ?);';
          d = [req.body.product_name, req.body.price, req.body.boughtDate, req.file.filename, 'look_like', req.body.numberOfProduct, 'descript'];
          _context2.next = 5;
          return regeneratorRuntime.awrap(connection.promise().query(q, d));

        case 5:
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error', _context2.t0); //   return next();

        case 10:
          res.redirect('/products/new');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // CREATE TABLE product(
//     product_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//     productName VARCHAR(40) NOT NULL CHECK (productName <> ''),
//     seller VARCHAR(40) NOT NULL DEFAULT 'Alison',
//     buyer VARCHAR(40) NOT NULL DEFAULT 'Alison',
//     price INT NOT NULL CHECK (price <> ''),
//     boughtDate VARCHAR(40) NOT NULL,
//     product_photo VARCHAR(150) NOT NULL CHECK (product_photo <> ''),
//     look_like VARCHAR(150) NOT NULL CHECK (look_like <> ''),
//     numberOfProduct INT NOT NULL CHECK (numberOfProduct <> ''),
//     descript VARCHAR(200) NOT NULL,
//     CONSTRAINT fk_Seller_Id FOREIGN KEY(seller) REFERENCES user(user_id) ON DELETE CASCADE,
//     PRIMARY KEY (product_id)
//   );
// Show products

app.get('/products', function (req, res, next) {
  res.sendFile(__dirname + '/views/products.html');
}); // Profile

app.get('/profile', function (req, res, next) {
  // console.log(res.locals.currentUser );
  res.render('profile'); // res.sendFile(__dirname+'/views/profile.html');
}); // app.use('/users', userUpdateRoutes);
// user route
// they are in routes folder

app.use('/', userRoutes); // // go to login page
// app.get('/login', (req, res)=> {
//     res.sendFile(__dirname+'/views/login.html');
// })
// app.post("/login", passport.authenticate("local", {
// 	successRedirect: "/home",
// 	failureRedirect: "/login",
//     // failureFlash: true
// }), function (req, res) {
// });
// // go to register page
// app.get('/register', (req, res)=> {
//     res.sendFile(__dirname+'/views/register.html');
// })
// // user submit the form will come to here to do something
// app.post('/register', async (req,res, next) => {
//     try{
//         const {email, username, password, account} = req.body;
//         const q = 'INSERT INTO user(username, account, email, pass) VALUES (?, ?, ?, ?);';
//         const d = [username,account, email, password];
//         await connection.promise().query(q, d);
//         // var username = req.body.username
//         // var password = req.body.password
//         User.register(new User({ username: username }),
//                 password, function (err, user) {
//             if (err) {
//                 console.log(err);
//                 return res.sendFile(__dirname+'/views/home.html');
//             }
//             passport.authenticate("local")(
//                 req, res, function () {
//                 res.sendFile(__dirname+'/views/about.html');
//             });
//         });
//             /////
//     }
//     catch (e){
//         console.log("error:", e);
//     }
// });
// // logout
// app.get("/logout", function (req, res) {
//     console.log("before logout:", req)
//     req.logout();
//     req.flash('success', "GoodBye");
// 	res.redirect("/home");
// });
// cart

app.listen(3000);
console.log('GraphQL API server running at http://localhost:3000/graphql'); // upload.array('image') 已經把image傳到cloudinary 
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