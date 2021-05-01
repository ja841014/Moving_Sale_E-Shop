"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UserModel = {
  load: function load(context, userId) {
    var _ref, _ref2, rows, fields;

    return regeneratorRuntime.async(function load$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!context.userCache[userId]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", context.userCache[userId]);

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(context.db.query('SELECT * FROM user WHERE user_id = ?', [userId]));

          case 4:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 2);
            rows = _ref2[0];
            fields = _ref2[1];
            context.userCache[userId] = rows;
            return _context.abrupt("return", rows);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getName: function getName(context, _ref3) {
    var userId, rows;
    return regeneratorRuntime.async(function getName$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref3.userId;
            _context2.next = 3;
            return regeneratorRuntime.awrap(UserModel.load(context, userId));

          case 3:
            rows = _context2.sent;
            return _context2.abrupt("return", rows.length === 0 ? null : rows[0].userName);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getAccount: function getAccount(context, _ref4) {
    var userId, rows;
    return regeneratorRuntime.async(function getAccount$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = _ref4.userId;
            _context3.next = 3;
            return regeneratorRuntime.awrap(UserModel.load(context, userId));

          case 3:
            rows = _context3.sent;
            return _context3.abrupt("return", rows.length === 0 ? null : rows[0].account);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getPassword: function getPassword(context, _ref5) {
    var userId, rows;
    return regeneratorRuntime.async(function getPassword$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = _ref5.userId;
            _context4.next = 3;
            return regeneratorRuntime.awrap(UserModel.load(context, userId));

          case 3:
            rows = _context4.sent;
            return _context4.abrupt("return", rows.length === 0 ? null : rows[0].pass);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  getEmail: function getEmail(context, _ref6) {
    var userId, rows;
    return regeneratorRuntime.async(function getEmail$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = _ref6.userId;
            _context5.next = 3;
            return regeneratorRuntime.awrap(UserModel.load(context, userId));

          case 3:
            rows = _context5.sent;
            return _context5.abrupt("return", rows.length === 0 ? null : rows[0].email);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  } // getProducts: async (context, { userId }) => {
  //   const rows = UserModel.load(context, userId);
  //   return (rows.length === 0 ? null : rows[0].name);
  // }

};
var ProductModel = {
  load: function load(context, productId) {
    var _ref7, _ref8, rows, fields;

    return regeneratorRuntime.async(function load$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!context.userCache[productId]) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", context.productCache[productId]);

          case 2:
            _context6.next = 4;
            return regeneratorRuntime.awrap(context.db.query('SELECT * FROM product WHERE product_id = ?', [productId]));

          case 4:
            _ref7 = _context6.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            rows = _ref8[0];
            fields = _ref8[1];
            // console.log("product rows", rows)
            context.productCache[productId] = rows;
            return _context6.abrupt("return", rows);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  getName: function getName(context, _ref9) {
    var productId, rows;
    return regeneratorRuntime.async(function getName$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            productId = _ref9.productId;
            _context7.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context7.sent;
            return _context7.abrupt("return", rows.length === 0 ? null : rows[0].productName);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getPrice: function getPrice(context, _ref10) {
    var productId, rows;
    return regeneratorRuntime.async(function getPrice$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            productId = _ref10.productId;
            _context8.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context8.sent;
            return _context8.abrupt("return", rows.length === 0 ? null : rows[0].price);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  getSeller: function getSeller(context, _ref11) {
    var productId, rows;
    return regeneratorRuntime.async(function getSeller$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            productId = _ref11.productId;
            _context9.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context9.sent;
            console.log("getSeller", rows[0].seller);
            return _context9.abrupt("return", rows.length === 0 ? null : {
              userId: rows[0].seller
            });

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  getBuyer: function getBuyer(context, _ref12) {
    var productId, rows;
    return regeneratorRuntime.async(function getBuyer$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            productId = _ref12.productId;
            _context10.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context10.sent;
            return _context10.abrupt("return", rows.length === 0 ? null : rows[0].buyer);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  getBoughtDate: function getBoughtDate(context, _ref13) {
    var productId, rows;
    return regeneratorRuntime.async(function getBoughtDate$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            productId = _ref13.productId;
            _context11.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context11.sent;
            return _context11.abrupt("return", rows.length === 0 ? null : rows[0].boughtDate);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    });
  },
  getProductPhoto: function getProductPhoto(context, _ref14) {
    var productId, rows;
    return regeneratorRuntime.async(function getProductPhoto$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            productId = _ref14.productId;
            _context12.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context12.sent;
            return _context12.abrupt("return", rows.length === 0 ? null : rows[0].product_photo);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    });
  },
  getLookLike: function getLookLike(context, _ref15) {
    var productId, rows;
    return regeneratorRuntime.async(function getLookLike$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            productId = _ref15.productId;
            _context13.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context13.sent;
            return _context13.abrupt("return", rows.length === 0 ? null : rows[0].look_like);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    });
  },
  getNumberOfProduct: function getNumberOfProduct(context, _ref16) {
    var productId, rows;
    return regeneratorRuntime.async(function getNumberOfProduct$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            productId = _ref16.productId;
            _context14.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context14.sent;
            return _context14.abrupt("return", rows.length === 0 ? null : rows[0].numberOfProduct);

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    });
  },
  getDescript: function getDescript(context, _ref17) {
    var productId, rows;
    return regeneratorRuntime.async(function getDescript$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            productId = _ref17.productId;
            _context15.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context15.sent;
            return _context15.abrupt("return", rows.length === 0 ? null : rows[0].descript);

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    });
  }
};
var resolvers = {
  Product: {
    productId: function productId(_ref18, _, context) {
      var _productId = _ref18.productId;
      // console.log("productId", productId)
      return _productId;
    },
    productName: function productName(_ref19, _, context) {
      var productId;
      return regeneratorRuntime.async(function productName$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              productId = _ref19.productId;
              return _context16.abrupt("return", ProductModel.getName(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      });
    },
    price: function price(_ref20, _, context) {
      var productId;
      return regeneratorRuntime.async(function price$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              productId = _ref20.productId;
              return _context17.abrupt("return", ProductModel.getPrice(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      });
    },
    seller: function seller(_ref21, _, context) {
      var productId;
      return regeneratorRuntime.async(function seller$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              productId = _ref21.productId;
              return _context18.abrupt("return", ProductModel.getSeller(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      });
    },
    buyer: function buyer(_ref22, _, context) {
      var productId;
      return regeneratorRuntime.async(function buyer$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              productId = _ref22.productId;
              return _context19.abrupt("return", ProductModel.getBuyer(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      });
    },
    boughtDate: function boughtDate(_ref23, _, context) {
      var productId;
      return regeneratorRuntime.async(function boughtDate$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              productId = _ref23.productId;
              return _context20.abrupt("return", ProductModel.getBoughtDate(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      });
    },
    product_photo: function product_photo(_ref24, _, context) {
      var productId;
      return regeneratorRuntime.async(function product_photo$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              productId = _ref24.productId;
              return _context21.abrupt("return", ProductModel.getProductPhoto(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      });
    },
    look_like: function look_like(_ref25, _, context) {
      var productId;
      return regeneratorRuntime.async(function look_like$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              productId = _ref25.productId;
              return _context22.abrupt("return", ProductModel.getLookLike(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      });
    },
    numberOfProduct: function numberOfProduct(_ref26, _, context) {
      var productId;
      return regeneratorRuntime.async(function numberOfProduct$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              productId = _ref26.productId;
              return _context23.abrupt("return", ProductModel.getNumberOfProduct(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      });
    },
    descript: function descript(_ref27, _, context) {
      var productId;
      return regeneratorRuntime.async(function descript$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              productId = _ref27.productId;
              return _context24.abrupt("return", ProductModel.getDescript(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      });
    }
  },
  Query: {
    user: function user(_, _ref28, context) {
      var userId, _ref29, _ref30, rows, fields;

      return regeneratorRuntime.async(function user$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              userId = _ref28.userId;
              _context25.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT user_id AS userId FROM user WHERE user_id = ?', [userId]));

            case 3:
              _ref29 = _context25.sent;
              _ref30 = _slicedToArray(_ref29, 2);
              rows = _ref30[0];
              fields = _ref30[1];
              return _context25.abrupt("return", rows.length > 0 ? {
                userId: rows[0].userId
              } : null);

            case 8:
            case "end":
              return _context25.stop();
          }
        }
      });
    },
    users: function users(_, _ref31, context) {
      var _ref31$limit, limit, _ref31$offset, offset, _ref31$sort, sort, _ref32, _ref33, rows, fields;

      return regeneratorRuntime.async(function users$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _ref31$limit = _ref31.limit, limit = _ref31$limit === void 0 ? 20 : _ref31$limit, _ref31$offset = _ref31.offset, offset = _ref31$offset === void 0 ? 0 : _ref31$offset, _ref31$sort = _ref31.sort, sort = _ref31$sort === void 0 ? 'ASC' : _ref31$sort;
              _context26.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT user_id AS userId FROM user LIMIT ? OFFSET ?', [limit, offset]));

            case 3:
              _ref32 = _context26.sent;
              _ref33 = _slicedToArray(_ref32, 2);
              rows = _ref33[0];
              fields = _ref33[1];
              return _context26.abrupt("return", rows);

            case 8:
            case "end":
              return _context26.stop();
          }
        }
      });
    },
    product: function product(_, _ref34, context) {
      var productId, _ref35, _ref36, rows, fields;

      return regeneratorRuntime.async(function product$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              productId = _ref34.productId;
              _context27.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product WHERE product_id = ?', [productId]));

            case 3:
              _ref35 = _context27.sent;
              _ref36 = _slicedToArray(_ref35, 2);
              rows = _ref36[0];
              fields = _ref36[1];
              return _context27.abrupt("return", rows.length > 0 ? {
                productId: rows[0].productId
              } : null);

            case 8:
            case "end":
              return _context27.stop();
          }
        }
      });
    },
    products: function products(_, _ref37, context) {
      var _ref37$limit, limit, _ref37$offset, offset, _ref37$sort, sort, _ref38, _ref39, rows, fields;

      return regeneratorRuntime.async(function products$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _ref37$limit = _ref37.limit, limit = _ref37$limit === void 0 ? 20 : _ref37$limit, _ref37$offset = _ref37.offset, offset = _ref37$offset === void 0 ? 0 : _ref37$offset, _ref37$sort = _ref37.sort, sort = _ref37$sort === void 0 ? 'ASC' : _ref37$sort;
              _context28.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product LIMIT ? OFFSET ?', [limit, offset]));

            case 3:
              _ref38 = _context28.sent;
              _ref39 = _slicedToArray(_ref38, 2);
              rows = _ref39[0];
              fields = _ref39[1];
              return _context28.abrupt("return", rows);

            case 8:
            case "end":
              return _context28.stop();
          }
        }
      });
    }
  },
  Mutation: {
    updateUser: function updateUser(_, _ref40, context) {
      var userId, account, email, q, d, _ref41, _ref42, rows, fields;

      return regeneratorRuntime.async(function updateUser$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              userId = _ref40.userId, account = _ref40.account, email = _ref40.email;
              console.log("mutation:", userId, account, email);
              q = '';
              d = [];

              if (account && !email) {
                console.log("email null");
                q = 'UPDATE user SET account = ? WHERE user_id = ?';
                d = [account, userId];
              } else if (!account && email) {
                console.log("account null");
                q = 'UPDATE user SET email = ? WHERE user_id = ?';
                d = [email, userId];
              } else {
                console.log("both not null");
                q = 'UPDATE user SET account = ?, email = ? WHERE user_id = ?';
                d = [account, email, userId];
              }

              _context29.next = 7;
              return regeneratorRuntime.awrap(context.db.query(q, d));

            case 7:
              _ref41 = _context29.sent;
              _ref42 = _slicedToArray(_ref41, 2);
              rows = _ref42[0];
              fields = _ref42[1];
              return _context29.abrupt("return", rows);

            case 12:
            case "end":
              return _context29.stop();
          }
        }
      });
    }
  },
  User: {
    userName: function userName(_ref43, _, context) {
      var userId;
      return regeneratorRuntime.async(function userName$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              userId = _ref43.userId;
              return _context30.abrupt("return", UserModel.getName(context, {
                userId: userId
              }));

            case 2:
            case "end":
              return _context30.stop();
          }
        }
      });
    },
    userId: function userId(_ref44, _, context) {
      var _userId = _ref44.userId;
      return _userId;
    },
    account: function account(_ref45, _, context) {
      var userId;
      return regeneratorRuntime.async(function account$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              userId = _ref45.userId;
              return _context31.abrupt("return", UserModel.getAccount(context, {
                userId: userId
              }));

            case 2:
            case "end":
              return _context31.stop();
          }
        }
      });
    },
    pass: function pass(_ref46, _, context) {
      var userId;
      return regeneratorRuntime.async(function pass$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              userId = _ref46.userId;
              return _context32.abrupt("return", UserModel.getPassword(context, {
                userId: userId
              }));

            case 2:
            case "end":
              return _context32.stop();
          }
        }
      });
    },
    email: function email(_ref47, _, context) {
      var userId;
      return regeneratorRuntime.async(function email$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              userId = _ref47.userId;
              return _context33.abrupt("return", UserModel.getEmail(context, {
                userId: userId
              }));

            case 2:
            case "end":
              return _context33.stop();
          }
        }
      });
    },
    products: function products(_ref48, _, context) {
      var userId, _ref49, _ref50, rows, fields;

      return regeneratorRuntime.async(function products$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              userId = _ref48.userId;
              _context34.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product WHERE seller = ?', [userId]));

            case 3:
              _ref49 = _context34.sent;
              _ref50 = _slicedToArray(_ref49, 2);
              rows = _ref50[0];
              fields = _ref50[1];
              return _context34.abrupt("return", rows.map(function (_ref51) {
                var productId = _ref51.productId;
                return {
                  productId: productId
                };
              }));

            case 8:
            case "end":
              return _context34.stop();
          }
        }
      });
    }
  }
};
module.exports = resolvers;