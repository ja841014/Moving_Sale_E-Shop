"use strict";

var User = require('../models/user');

var _require = require("../database"),
    connection = _require.connection;

module.exports.renderRegister = function (req, res) {
  res.render('./register');
};

module.exports.register = function _callee(req, res, next) {
  var _req$body, email, username, password, account, user, registerUser, q, d;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password, account = _req$body.account;
          user = new User({
            email: email,
            username: username
          }); // pass the user object and password in it and save it in db

          _context.next = 5;
          return regeneratorRuntime.awrap(User.register(user, password));

        case 5:
          registerUser = _context.sent;
          q = 'INSERT INTO user(user_id, username, account, email, pass) VALUES (?, ?, ?, ?, ?);';
          d = [String(registerUser._id), username, account, email, password];
          _context.next = 10;
          return regeneratorRuntime.awrap(connection.promise().query(q, d));

        case 10:
          console.log("registerUser", registerUser);
          req.login(registerUser, function (err) {
            if (err) {
              return next(err);
            } else {
              req.flash('success', 'Walcome to Moving E-Shop'); // console.log(req);

              res.redirect('/home');
            }
          });
          _context.next = 19;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log("register error:", _context.t0.message);
          req.flash('error', _context.t0.message);
          res.redirect('/register');

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports.renderLogin = function (req, res) {
  // res.sendFile(__dirname + '/views/login.html');
  res.render('./login');
};

module.exports.login = function (req, res) {
  // console.log("dfdfdsfdsfdsfs")
  // console.log("req", req);
  // console.log("res", res);
  req.flash('success', 'Walcome Back');
  var redirectUrl = req.session.returnTo || '/products';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = function (req, res) {
  console.log("LOGOUT!!");
  req.logout();
  req.flash('success', "GoodBye"); // console.log(req);

  res.redirect('/home');
};