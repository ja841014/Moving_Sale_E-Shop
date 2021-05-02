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
  // getBuyer: async (context, { productId }) => {
  //   const rows = await ProductModel.load(context, productId);
  //   return (rows.length === 0 ? null : rows[0].buyer);
  // },
  getBoughtDate: function getBoughtDate(context, _ref12) {
    var productId, rows;
    return regeneratorRuntime.async(function getBoughtDate$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            productId = _ref12.productId;
            _context10.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context10.sent;
            return _context10.abrupt("return", rows.length === 0 ? null : rows[0].boughtDate);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  getProductPhoto: function getProductPhoto(context, _ref13) {
    var productId, rows;
    return regeneratorRuntime.async(function getProductPhoto$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            productId = _ref13.productId;
            _context11.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context11.sent;
            return _context11.abrupt("return", rows.length === 0 ? null : rows[0].product_photo);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    });
  },
  getLookLike: function getLookLike(context, _ref14) {
    var productId, rows;
    return regeneratorRuntime.async(function getLookLike$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            productId = _ref14.productId;
            _context12.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context12.sent;
            return _context12.abrupt("return", rows.length === 0 ? null : rows[0].look_like);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    });
  },
  getNumberOfProduct: function getNumberOfProduct(context, _ref15) {
    var productId, rows;
    return regeneratorRuntime.async(function getNumberOfProduct$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            productId = _ref15.productId;
            _context13.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context13.sent;
            return _context13.abrupt("return", rows.length === 0 ? null : rows[0].numberOfProduct);

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    });
  },
  getDescript: function getDescript(context, _ref16) {
    var productId, rows;
    return regeneratorRuntime.async(function getDescript$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            productId = _ref16.productId;
            _context14.next = 3;
            return regeneratorRuntime.awrap(ProductModel.load(context, productId));

          case 3:
            rows = _context14.sent;
            return _context14.abrupt("return", rows.length === 0 ? null : rows[0].descript);

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    });
  } // ,
  // getSoldDate: async (context, { productId }) => {
  //   const rows = await ProductModel.load(context, productId);
  //   return (rows.length === 0 ? null : rows[0].buy_at);
  // }

};
var resolvers = {
  Product: {
    productId: function productId(_ref17, _, context) {
      var _productId = _ref17.productId;
      // console.log("productId", productId)
      return _productId;
    },
    productName: function productName(_ref18, _, context) {
      var productId;
      return regeneratorRuntime.async(function productName$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              productId = _ref18.productId;
              return _context15.abrupt("return", ProductModel.getName(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      });
    },
    price: function price(_ref19, _, context) {
      var productId;
      return regeneratorRuntime.async(function price$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              productId = _ref19.productId;
              return _context16.abrupt("return", ProductModel.getPrice(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      });
    },
    seller: function seller(_ref20, _, context) {
      var productId;
      return regeneratorRuntime.async(function seller$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              productId = _ref20.productId;
              return _context17.abrupt("return", ProductModel.getSeller(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      });
    },
    // buyer: async({ productId }, _, context) => {
    //   return ProductModel.getBuyer(context, { productId });
    // },
    boughtDate: function boughtDate(_ref21, _, context) {
      var productId;
      return regeneratorRuntime.async(function boughtDate$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              productId = _ref21.productId;
              return _context18.abrupt("return", ProductModel.getBoughtDate(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      });
    },
    product_photo: function product_photo(_ref22, _, context) {
      var productId;
      return regeneratorRuntime.async(function product_photo$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              productId = _ref22.productId;
              return _context19.abrupt("return", ProductModel.getProductPhoto(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      });
    },
    look_like: function look_like(_ref23, _, context) {
      var productId;
      return regeneratorRuntime.async(function look_like$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              productId = _ref23.productId;
              return _context20.abrupt("return", ProductModel.getLookLike(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      });
    },
    numberOfProduct: function numberOfProduct(_ref24, _, context) {
      var productId;
      return regeneratorRuntime.async(function numberOfProduct$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              productId = _ref24.productId;
              return _context21.abrupt("return", ProductModel.getNumberOfProduct(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      });
    },
    descript: function descript(_ref25, _, context) {
      var productId;
      return regeneratorRuntime.async(function descript$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              productId = _ref25.productId;
              return _context22.abrupt("return", ProductModel.getDescript(context, {
                productId: productId
              }));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      });
    } // ,
    // soldDate: async({ productId }, _, context) => {
    //   console.log("soldDate",productId)
    //   const [rows, fields] = await context.db.query('SELECT buy_at AS BoughtDate FROM history WHERE product_id = ?', [productId]);
    //   console.log("soldDate after:", JSON.stringify(rows))
    //   return rows.map(({ BoughtDate }) => ({ BoughtDate: BoughtDate }));
    // }

  },
  Query: {
    user: function user(_, _ref26, context) {
      var userId, _ref27, _ref28, rows, fields;

      return regeneratorRuntime.async(function user$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              userId = _ref26.userId;
              _context23.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT user_id AS userId FROM user WHERE user_id = ?', [userId]));

            case 3:
              _ref27 = _context23.sent;
              _ref28 = _slicedToArray(_ref27, 2);
              rows = _ref28[0];
              fields = _ref28[1];
              return _context23.abrupt("return", rows.length > 0 ? {
                userId: rows[0].userId
              } : null);

            case 8:
            case "end":
              return _context23.stop();
          }
        }
      });
    },
    users: function users(_, _ref29, context) {
      var _ref29$limit, limit, _ref29$offset, offset, _ref29$sort, sort, _ref30, _ref31, rows, fields;

      return regeneratorRuntime.async(function users$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _ref29$limit = _ref29.limit, limit = _ref29$limit === void 0 ? 20 : _ref29$limit, _ref29$offset = _ref29.offset, offset = _ref29$offset === void 0 ? 0 : _ref29$offset, _ref29$sort = _ref29.sort, sort = _ref29$sort === void 0 ? 'ASC' : _ref29$sort;
              _context24.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT user_id AS userId FROM user LIMIT ? OFFSET ?', [limit, offset]));

            case 3:
              _ref30 = _context24.sent;
              _ref31 = _slicedToArray(_ref30, 2);
              rows = _ref31[0];
              fields = _ref31[1];
              return _context24.abrupt("return", rows);

            case 8:
            case "end":
              return _context24.stop();
          }
        }
      });
    },
    product: function product(_, _ref32, context) {
      var productId, _ref33, _ref34, rows, fields;

      return regeneratorRuntime.async(function product$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              productId = _ref32.productId;
              _context25.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product WHERE product_id = ?', [productId]));

            case 3:
              _ref33 = _context25.sent;
              _ref34 = _slicedToArray(_ref33, 2);
              rows = _ref34[0];
              fields = _ref34[1];
              return _context25.abrupt("return", rows.length > 0 ? {
                productId: rows[0].productId
              } : null);

            case 8:
            case "end":
              return _context25.stop();
          }
        }
      });
    },
    products: function products(_, _ref35, context) {
      var _ref35$limit, limit, _ref35$offset, offset, _ref35$sort, sort, _ref36, _ref37, rows, fields;

      return regeneratorRuntime.async(function products$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _ref35$limit = _ref35.limit, limit = _ref35$limit === void 0 ? 20 : _ref35$limit, _ref35$offset = _ref35.offset, offset = _ref35$offset === void 0 ? 0 : _ref35$offset, _ref35$sort = _ref35.sort, sort = _ref35$sort === void 0 ? 'ASC' : _ref35$sort;
              _context26.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product LIMIT ? OFFSET ?', [limit, offset]));

            case 3:
              _ref36 = _context26.sent;
              _ref37 = _slicedToArray(_ref36, 2);
              rows = _ref37[0];
              fields = _ref37[1];
              return _context26.abrupt("return", rows);

            case 8:
            case "end":
              return _context26.stop();
          }
        }
      });
    },
    history: function history(_, _ref38, context) {
      var historyId, _ref39, _ref40, rows, fields;

      return regeneratorRuntime.async(function history$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              historyId = _ref38.historyId;
              console.log("history", historyId);
              _context27.next = 4;
              return regeneratorRuntime.awrap(context.db.query('SELECT history_id AS historyId FROM history WHERE history_id = ?', [historyId]));

            case 4:
              _ref39 = _context27.sent;
              _ref40 = _slicedToArray(_ref39, 2);
              rows = _ref40[0];
              fields = _ref40[1];
              return _context27.abrupt("return", rows.length > 0 ? {
                historyId: rows[0].historyId
              } : null);

            case 9:
            case "end":
              return _context27.stop();
          }
        }
      });
    },
    historys: function historys(_, _ref41, context) {
      var _ref41$limit, limit, _ref41$offset, offset, _ref41$sort, sort, _ref42, _ref43, rows, fields;

      return regeneratorRuntime.async(function historys$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _ref41$limit = _ref41.limit, limit = _ref41$limit === void 0 ? 20 : _ref41$limit, _ref41$offset = _ref41.offset, offset = _ref41$offset === void 0 ? 0 : _ref41$offset, _ref41$sort = _ref41.sort, sort = _ref41$sort === void 0 ? 'ASC' : _ref41$sort;
              _context28.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT history_id AS historyId FROM history LIMIT ? OFFSET ?', [limit, offset]));

            case 3:
              _ref42 = _context28.sent;
              _ref43 = _slicedToArray(_ref42, 2);
              rows = _ref43[0];
              fields = _ref43[1];
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
    updateUser: function updateUser(_, _ref44, context) {
      var userId, account, email, q, d, _ref45, _ref46, rows, fields;

      return regeneratorRuntime.async(function updateUser$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              userId = _ref44.userId, account = _ref44.account, email = _ref44.email;
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
              _ref45 = _context29.sent;
              _ref46 = _slicedToArray(_ref45, 2);
              rows = _ref46[0];
              fields = _ref46[1];
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
    userName: function userName(_ref47, _, context) {
      var userId;
      return regeneratorRuntime.async(function userName$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              userId = _ref47.userId;
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
    userId: function userId(_ref48, _, context) {
      var _userId = _ref48.userId;
      return _userId;
    },
    account: function account(_ref49, _, context) {
      var userId;
      return regeneratorRuntime.async(function account$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              userId = _ref49.userId;
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
    pass: function pass(_ref50, _, context) {
      var userId;
      return regeneratorRuntime.async(function pass$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              userId = _ref50.userId;
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
    email: function email(_ref51, _, context) {
      var userId;
      return regeneratorRuntime.async(function email$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              userId = _ref51.userId;
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
    products: function products(_ref52, _, context) {
      var userId, _ref53, _ref54, rows, fields;

      return regeneratorRuntime.async(function products$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              userId = _ref52.userId;
              _context34.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_id AS productId FROM product WHERE seller = ?', [userId]));

            case 3:
              _ref53 = _context34.sent;
              _ref54 = _slicedToArray(_ref53, 2);
              rows = _ref54[0];
              fields = _ref54[1];
              return _context34.abrupt("return", rows.map(function (_ref55) {
                var productId = _ref55.productId;
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
    },
    buyProducts: function buyProducts(_ref56, _, context) {
      var userId, _ref57, _ref58, rows, fields;

      return regeneratorRuntime.async(function buyProducts$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              userId = _ref56.userId;
              _context35.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT history_id AS HistoryId FROM history WHERE buyer = ?', [userId]));

            case 3:
              _ref57 = _context35.sent;
              _ref58 = _slicedToArray(_ref57, 2);
              rows = _ref58[0];
              fields = _ref58[1];
              console.log("buyProducts::::", JSON.stringify(rows));
              return _context35.abrupt("return", rows.map(function (_ref59) {
                var HistoryId = _ref59.HistoryId;
                return {
                  HistoryId: HistoryId
                };
              }));

            case 9:
            case "end":
              return _context35.stop();
          }
        }
      });
    } // ,
    // buyDate: async ({ userId }, _, context) => {
    //   console.log(userId)
    //   const [rows, fields] = await context.db.query('SELECT history_id AS HistoryId FROM history WHERE buyer = ?', [userId]);
    //   console.log("BoughtDate", JSON.stringify(rows))
    //   return rows.map(({ HistoryId }) => ({ HistoryId: HistoryId }));
    // }

  },
  History: {
    buyer: function buyer(_ref60, _, context) {
      var HistoryId, _ref61, _ref62, rows, fields;

      return regeneratorRuntime.async(function buyer$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              HistoryId = _ref60.HistoryId;
              _context36.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT buyer FROM history WHERE history_id = ?', [HistoryId]));

            case 3:
              _ref61 = _context36.sent;
              _ref62 = _slicedToArray(_ref61, 2);
              rows = _ref62[0];
              fields = _ref62[1];
              return _context36.abrupt("return", rows.length === 0 ? null : rows[0].buyer);

            case 8:
            case "end":
              return _context36.stop();
          }
        }
      });
    },
    buy_at: function buy_at(_ref63, _, context) {
      var HistoryId, _ref64, _ref65, rows, fields;

      return regeneratorRuntime.async(function buy_at$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              HistoryId = _ref63.HistoryId;
              _context37.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT buy_at FROM history WHERE history_id = ?', [HistoryId]));

            case 3:
              _ref64 = _context37.sent;
              _ref65 = _slicedToArray(_ref64, 2);
              rows = _ref65[0];
              fields = _ref65[1];
              return _context37.abrupt("return", rows.length === 0 ? null : rows[0].buy_at.toISOString().substring(0, 10));

            case 8:
            case "end":
              return _context37.stop();
          }
        }
      });
    },
    num: function num(_ref66, _, context) {
      var HistoryId, _ref67, _ref68, rows, fields;

      return regeneratorRuntime.async(function num$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              HistoryId = _ref66.HistoryId;
              _context38.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT num FROM history WHERE history_id = ?', [HistoryId]));

            case 3:
              _ref67 = _context38.sent;
              _ref68 = _slicedToArray(_ref67, 2);
              rows = _ref68[0];
              fields = _ref68[1];
              return _context38.abrupt("return", rows.length === 0 ? null : rows[0].num);

            case 8:
            case "end":
              return _context38.stop();
          }
        }
      });
    },
    product_name: function product_name(_ref69, _, context) {
      var HistoryId, _ref70, _ref71, rows, fields;

      return regeneratorRuntime.async(function product_name$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              HistoryId = _ref69.HistoryId;
              _context39.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT product_name FROM history WHERE history_id = ?', [HistoryId]));

            case 3:
              _ref70 = _context39.sent;
              _ref71 = _slicedToArray(_ref70, 2);
              rows = _ref71[0];
              fields = _ref71[1];
              return _context39.abrupt("return", rows.length === 0 ? null : rows[0].product_name);

            case 8:
            case "end":
              return _context39.stop();
          }
        }
      });
    },
    price: function price(_ref72, _, context) {
      var HistoryId, _ref73, _ref74, rows, fields;

      return regeneratorRuntime.async(function price$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              HistoryId = _ref72.HistoryId;
              _context40.next = 3;
              return regeneratorRuntime.awrap(context.db.query('SELECT price FROM history WHERE history_id = ?', [HistoryId]));

            case 3:
              _ref73 = _context40.sent;
              _ref74 = _slicedToArray(_ref73, 2);
              rows = _ref74[0];
              fields = _ref74[1];
              return _context40.abrupt("return", rows.length === 0 ? null : rows[0].price);

            case 8:
            case "end":
              return _context40.stop();
          }
        }
      });
    }
  }
};
module.exports = resolvers;