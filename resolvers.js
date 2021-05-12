"use strict";

const UserModel = {
  load: async (context, userId) => {
    if (context.userCache[userId]) {
      return context.userCache[userId];
    }

    const [rows, fields] = await context.db.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    
    context.userCache[userId] = rows;
    return rows;
  },

  getName: async (context, { userId }) => {
    const rows = await UserModel.load(context, userId);
    return (rows.length === 0 ? null : rows[0].userName);
  },

  getAccount: async (context, { userId }) => {
    const rows = await UserModel.load(context, userId);
    return (rows.length === 0 ? null : rows[0].account);
  },

  getPassword: async (context, { userId }) => {
    const rows = await UserModel.load(context, userId);
    return (rows.length === 0 ? null : rows[0].pass);
  },

  getEmail: async (context, { userId }) => {
    const rows = await UserModel.load(context, userId);
    return (rows.length === 0 ? null : rows[0].email);
  }

 
}

const ProductModel = {
  load: async (context, productId) => {
    if (context.userCache[productId]) {
      return context.productCache[productId];
    }
    const [rows, fields] = await context.db.query('SELECT * FROM product WHERE product_id = ?', [productId]);
    context.productCache[productId] = rows;
    return rows;
  },

  getName: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].productName);
  },
  getPrice: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].price);
  },
  getSeller: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);

    return (rows.length === 0 ? null : { userId: rows[0].seller });
  },
  
  getCategory: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].category);
  },
  getBoughtDate: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].boughtDate);
  },
  getProductPhoto: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].product_photo);
  },
  getLookLike: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].look_like);
  },
  getNumberOfProduct: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].numberOfProduct);
  },
  getDescript: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].descript);
  }
  

}



const resolvers = {
  Product: {
    productId: ({ productId }, _, context) => {
      return productId;
    },
    productName: async({ productId }, _, context) => {
      
      return ProductModel.getName(context, { productId });
    },
    price: async({ productId }, _, context) => {
      return ProductModel.getPrice(context, { productId });
    },
    seller: async({ productId }, _, context) => {
      
      return ProductModel.getSeller(context, { productId });
    },
    
    category: async({ productId }, _, context) => {
      return ProductModel.getCategory(context, { productId });
    },
    boughtDate: async({ productId }, _, context) => {
      return ProductModel.getBoughtDate(context, { productId });
    },
    product_photo: async({ productId }, _, context) => {
      return ProductModel.getProductPhoto(context, { productId });
    },
    look_like: async({ productId }, _, context) => {
      return ProductModel.getLookLike(context, { productId });
    },
    numberOfProduct: async({ productId }, _, context) => {
      return ProductModel.getNumberOfProduct(context, { productId });
    },
    descript: async({ productId }, _, context) => {
      return ProductModel.getDescript(context, { productId });
    }
    
  },
  Query: {
    user: async (_, { userId }, context) => {
      const [rows, fields] = await context.db.query('SELECT user_id AS userId FROM user WHERE user_id = ?', [userId]);
      // console.log("Query user", userId)
      return (rows.length > 0 ? { userId: rows[0].userId } : null);
    },
    users: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      const [rows, fields] = await context.db.query('SELECT user_id AS userId FROM user LIMIT ? OFFSET ?', [limit, offset]);
      // console.log("Query users:")
      return rows;
    },
    product: async (_, { productId }, context) => {
      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product WHERE product_id = ?', [productId]);
      return (rows.length > 0 ? { productId: rows[0].productId } : null);
    },
    products: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product LIMIT ? OFFSET ?', [limit, offset]);
      return rows;
    },

    history: async (_, { historyId }, context) => {
      // console.log("history", historyId);
      const [rows, fields] = await context.db.query('SELECT history_id AS historyId FROM history WHERE history_id = ?', [historyId]);
      return (rows.length > 0 ? { historyId: rows[0].historyId } : null);
    },
    historys: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      const [rows, fields] = await context.db.query('SELECT history_id AS historyId FROM history LIMIT ? OFFSET ?', [limit, offset]);
      return rows;
    },

  },
  Mutation: {
    updateUser: async(_, { userId, account, email }, context) => {
      let q = '';
      let d = [];
      if(account && !email ) {
        q = 'UPDATE user SET account = ? WHERE user_id = ?';
        d = [account, userId];
      }
      else if(!account  && email ) {
        q = 'UPDATE user SET email = ? WHERE user_id = ?';
        d = [email, userId];
      }
      else {
        q = 'UPDATE user SET account = ?, email = ? WHERE user_id = ?';
        d = [account, email, userId];
      }
      const [rows, fields] = await context.db.query(q, d);
      return rows
    }
  },
  User: {
    userName: async ({ userId }, _, context) => {
      return UserModel.getName(context, { userId });
    },
    userId: ({ userId }, _, context) => {
      return userId;
    },
    account: async ({ userId }, _, context) => {
      return UserModel.getAccount(context, { userId });
    },
    pass: async ({ userId }, _, context) => {
      return UserModel.getPassword(context, { userId });
    },
    email: async ({ userId }, _, context) => {
      return UserModel.getEmail(context, { userId });
    },
    products: async ({ userId }, _, context) => {

      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product WHERE seller = ?', [userId]);
      return rows.map(({ productId }) => ({ productId: productId }));
    },
    buyProducts: async ({ userId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT history_id AS HistoryId FROM history WHERE buyer = ?', [userId]);
      return rows.map(({ HistoryId }) => ({ HistoryId: HistoryId }));
    }
    
  },
  History: {
    buyer: async ({ HistoryId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT buyer FROM history WHERE history_id = ?', [HistoryId]);
      return (rows.length === 0 ? null : rows[0].buyer);
      
    },
    buy_at: async ({ HistoryId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT buy_at FROM history WHERE history_id = ?', [HistoryId]);

      return (rows.length === 0 ? null : rows[0].buy_at.toISOString().substring(0, 10) );
      
    },
    num: async ({ HistoryId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT num FROM history WHERE history_id = ?', [HistoryId]);
      return (rows.length === 0 ? null : rows[0].num );
    },
    product_name: async ({ HistoryId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT product_name FROM history WHERE history_id = ?', [HistoryId]);
      return (rows.length === 0 ? null : rows[0].product_name );
    },
    price: async ({ HistoryId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT price FROM history WHERE history_id = ?', [HistoryId]);
      return (rows.length === 0 ? null : rows[0].price );
    }

  }

};



module.exports = resolvers;
