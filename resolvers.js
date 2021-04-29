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
    // console.log("product rows", rows)
    context.productCache[productId] = rows;
    return rows;
  },

  getName: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    // console.log("product rows getName", rows)
    return (rows.length === 0 ? null : rows[0].productName);
  },

  getImage1: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].image1);
  },
  getImage2: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].image2);
  },
  getImage3: async (context, { productId }) => {
    const rows = await ProductModel.load(context, productId);
    return (rows.length === 0 ? null : rows[0].image3);
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
      // console.log("productId", productId)
      return productId;
    },
    productName: async({ productId }, _, context) => {
      
      return ProductModel.getName(context, { productId });
    },
    price: async({ productId }, _, context) => {
      return ProductModel.getPrice(context, { productId });
    },
    image1: async ({ productId }, _, context) => {
      return ProductModel.getImage1(context, { productId });
    },
    image2: async ({ productId }, _, context) => {
      return ProductModel.getImage2(context, { productId });
    },
    image3: async ({ productId }, _, context) => {
      return ProductModel.getImage3(context, { productId });
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

      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product WHERE product_id = ?', [productId]);
      return (rows.length > 0 ? { productId: rows[0].productId } : null);
    },
    products: async (_, { limit = 20, offset = 0, sort = 'ASC' }, context) => {
      
      const [rows, fields] = await context.db.query('SELECT product_id AS productId FROM product LIMIT ? OFFSET ?', [limit, offset]);
      return rows;
    }
  },
  Mutation: {
    updateUser: async(_, { userId, account, email }, context) => {
      console.log("mutation:", userId,account, email);
      let q = '';
      let d = [];
      if(account && !email ) {
        console.log("email null")
        q = 'UPDATE user SET account = ? WHERE user_id = ?';
        d = [account, userId];
      }
      else if(!account  && email ) {
        console.log("account null")
        q = 'UPDATE user SET email = ? WHERE user_id = ?';
        d = [email, userId];
      }
      else {
        console.log("both not null")
        q = 'UPDATE user SET account = ?, email = ? WHERE user_id = ?';
        d = [account, email, userId];
      }
      const [rows, fields] = await context.db.query(q, d);
      // this return is useless, because mysql cannot return anything
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
    }
  }
};



module.exports = resolvers;
