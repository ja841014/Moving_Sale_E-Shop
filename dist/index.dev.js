"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/project'; ///////////////////

var jsonBodyParser = bodyParser.json(); ///////////////////
// project db name
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
          _context.t5 = {};
          _context.t6 = {
            req: _context.t1,
            db: _context.t2,
            userCache: _context.t3,
            productCache: _context.t4,
            historyCache: _context.t5
          };
          return _context.abrupt("return", {
            schema: _context.t0,
            graphiql: true,
            context: _context.t6
          });

        case 10:
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
  res.render('home');
}); // Introduce our website

app.get('/about', function (req, res, next) {
  res.render('about'); // res.sendFile(__dirname+'/views/about.html');
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
          console.log(req.user);
          _context2.prev = 1;
          q = 'INSERT INTO product(seller, category, productName, price, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
          d = [String(req.user), req.body.category, req.body.product_name, req.body.price, req.body.boughtDate, req.file.path, req.body.look_like, req.body.numberOfProduct, req.body.descript];
          _context2.next = 6;
          return regeneratorRuntime.awrap(connection.promise().query(q, d));

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error('Errorrrr', _context2.t0); //   return next();

        case 11:
          res.redirect('/products/new');

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.get('/products/new/:productId', jsonBodyParser, function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // console.log(req.params)
          res.render('productDetail');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Show products

app.get('/products', function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("products");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // app.get('/products/clothes', async (req, res, next) => {
//   res.sendFile(__dirname+'/views/productsClothes.html');
// });
// app.get('/products/furnitures', async (req, res, next) => {
//   res.sendFile(__dirname+'/views/productsFurnitures.html');
// });

app.post('/cart', jsonBodyParser, function _callee5(req, res, next) {
  var i, curUser, _req$body$i, productName, productId, price, sellerName, number, q, d, _ref, _ref2, rows, fields, numberOfProduct, updateq, updated, _ref3, _ref4, rowsUPDATE, fieldsUPDATE, insertq, insertd, _ref5, _ref6, rowsInsert, fieldsInsert;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < req.body.length)) {
            _context5.next = 37;
            break;
          }

          curUser = req.user._id;
          console.log("user:", curUser);
          _req$body$i = req.body[i], productName = _req$body$i.productName, productId = _req$body$i.productId, price = _req$body$i.price, sellerName = _req$body$i.sellerName, number = _req$body$i.number;
          console.log("productId", productId);
          q = 'SELECT numberOfProduct FROM product WHERE product_id =?';
          d = [productId];
          _context5.next = 10;
          return regeneratorRuntime.awrap(connection.promise().query(q, d));

        case 10:
          _ref = _context5.sent;
          _ref2 = _slicedToArray(_ref, 2);
          rows = _ref2[0];
          fields = _ref2[1];
          numberOfProduct = rows[0].numberOfProduct - number;
          console.log("numberOfProduct", numberOfProduct);
          updateq = 'UPDATE product SET numberOfProduct=?  WHERE product_id=?';
          updated = [numberOfProduct, productId];
          _context5.next = 20;
          return regeneratorRuntime.awrap(connection.promise().query(updateq, updated));

        case 20:
          _ref3 = _context5.sent;
          _ref4 = _slicedToArray(_ref3, 2);
          rowsUPDATE = _ref4[0];
          fieldsUPDATE = _ref4[1];
          console.log("rowsUPDATE:", rowsUPDATE);
          insertq = 'INSERT INTO history (buyer, seller, product_name, num, price) VALUES (?, ?, ?, ?, ?)';
          insertd = [String(curUser), String(sellerName), productName, number, Number(price) * Number(number)];
          _context5.next = 29;
          return regeneratorRuntime.awrap(connection.promise().query(insertq, insertd));

        case 29:
          _ref5 = _context5.sent;
          _ref6 = _slicedToArray(_ref5, 2);
          rowsInsert = _ref6[0];
          fieldsInsert = _ref6[1];
          console.log("DONE");

        case 34:
          i++;
          _context5.next = 1;
          break;

        case 37:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // fetch history
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

app.get('/profile', function (req, res, next) {
  console.log(res.locals.currentUser);
  res.render('profile'); // res.sendFile(__dirname+'/views/profile.html');
}); // user route
// they are in routes folder

app.use('/', userRoutes);
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