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

  // getProducts: async (context, { userId }) => {
  //   const rows = UserModel.load(context, userId);
  //   return (rows.length === 0 ? null : rows[0].name);
  // }
}

const ProductModel = {
  load: async (context, productId) => {
    if (context.userCache[productId]) {
      return context.productCache[productId];
    }
    const [rows, fields] = await context.db.query('SELECT * FROM product WHERE product_id = ?', [productId]);
    console.log("product rows", rows)
    context.userCache[productId] = rows;
    return rows;
  },

  getName: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    console.log("product rows getName", rows)
    return (rows.length === 0 ? null : rows[0].product_name);
  },

  getPrice: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].price);
  },
  getSeller: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].seller);
  },
  getBuyer: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].buyer);
  }


  // getProducts: async (context, { userId }) => {
  //   const rows = UserModel.load(context, userId);
  //   return (rows.length === 0 ? null : rows[0].name);
  // }
}



const resolvers = {
  Product: {
    productId: ({ productId }, _, context) => {
      console.log("productId", productId)
      return productId;
    },
    productName: async({ productId }, _, context) => {
      // console.log(productId);
      // const [rows, fields] = await context.db.query('SELECT product_name FROM product WHERE product_id = ?', [productId]);
      // console.log("productName", rows[0].product_name)
      // return (rows.length === 0 ? null : { productId: rows[0].productName });
      console.log("productName", productName)
      return ProductModel.getName(context, { productId });
    },
    price: async({ productId }, _, context) => {
      console.log("productprice", productId)
      return ProductModel.getPrice(context, { productId });
    },
    images: async ({ productId }, _, context) => {
      const [rows, fields] = await context.db.query('SELECT image1, image2, image3 FROM product WHERE product_id = ?', [productId]);
      return rows.map(({ product_id }) => ({ productId: product_id }));
    },
    seller: async({ productId }, _, context) => {
      return ProductModel.getSeller(context, { productId });
    },
    buyer: async({ productId }, _, context) => {
      return ProductModel.getBuyer(context, { productId });
    }
  },
  Query: {
    user: async (_, { userId }, context) => {
      const [rows, fields] = await context.db.query('SELECT user_id AS userId FROM user WHERE user_id = ?', [userId]);
      
      return (rows.length > 0 ? { userId: rows[0].userId } : null);
    },
    users: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      const [rows, fields] = await context.db.query('SELECT user_id AS userId FROM user LIMIT ? OFFSET ?', [limit, offset]);
      return rows;
    },
    product: async (_, { productId }, context) => {
      console.log("Query", productId)
      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product WHERE product_id = ?', [productId]);
      return (rows.length > 0 ? { productId: rows[0].productId } : null);
    },
    products: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      
      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product LIMIT ? OFFSET ?', [limit, offset]);
      console.log("Query rows", rows)
      return rows;
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
      const [rows, fields] = await context.db.query('SELECT product_id AS productID FROM product WHERE seller = ?', [userId]);
      console.log("User products", rows.map(({ productID }) => ({ productID: productID })));
      return rows.map(({ productID }) => ({ productID: productID }));
    }
  }
};



module.exports = resolvers;
