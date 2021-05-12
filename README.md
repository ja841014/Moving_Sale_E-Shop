# Moving_Sale_E-Shop

> This project is a full-stack implementation. It provides a front-end website and interacts with two back-end databases.
<p align="center"><img src="READMEIMG/Home.png" width="500" /></p>

- Please clone the repository, look through [README.md](README.md).

---

## The Database Schema
### MySQL
```sql
CREATE TABLE user(
  user_id VARCHAR(40) NOT NULL CHECK (user_id <> ''),
  userName VARCHAR(40) NOT NULL CHECK (userName <> ''),
  account VARCHAR(40) NOT NULL CHECK (account <> ''),
  email VARCHAR(50) NOT NULL CHECK (email <> ''),
  pass VARCHAR(50) NOT NULL CHECK (pass <> ''),
  PRIMARY KEY (user_id)
);

CREATE TABLE product(
  product_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  productName VARCHAR(40) NOT NULL CHECK (productName <> ''),
  seller VARCHAR(40) NOT NULL DEFAULT 'Alison',
  price INT UNSIGNED NOT NULL CHECK (price >= 0),
  category VARCHAR(40) NOT NULL,
  boughtDate VARCHAR(40) NOT NULL,
  product_photo VARCHAR(150) NOT NULL CHECK (product_photo <> ''),
  look_like VARCHAR(150) NOT NULL CHECK (look_like <> ''),
  numberOfProduct INT NOT NULL CHECK (numberOfProduct >= 0),
  descript VARCHAR(200) NOT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE history(
  history_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  price INT UNSIGNED NOT NULL,
  buyer VARCHAR(40) NOT NULL CHECK (buyer <> ''),
  seller VARCHAR(40) NOT NULL CHECK (seller <> ''),
  buy_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  product_name VARCHAR(40) NOT NULL CHECK (product_name <> ''),
  num INT UNSIGNED NOT NULL,
  PRIMARY KEY (history_id)
);
```

### MongoDB

---
### GraphQL
```graphql
type Product {
  productId:    ID!
  productName:  String!
  price:        Int!
  seller:       User!
  category:     String!
  boughtDate:   String!
  product_photo:String!
  look_like:    String!
  numberOfProduct: Int!
  descript:     String!
}

type User {
  userId:       ID!
  userName:     String
  account:      String!
  pass:         String!
  email:        String!
  products:     [Product]
  buyProducts:  [History]
}

type History {
  buyer:        String
  buy_at:       String
  num:          Int
  product_name: String
  price:        Int
}
```


---

## Prerequisites

### MySQL server start

Please start your MySQL server.
And then create database and tables which is mentioned above.
```sql
CREATE DATABASE project
```

### Edit [database.js](database.js)
Change the host ip.

### Create an .env file copy and paste the following lines inside

CLOUDINARY_CLOUD_NAME=ja841014
CLOUDINARY_KEY=767971241295556
CLOUDINARY_SECRET=6jdvnJYb6x259FP56wHhZpnqJ20
DB_URL=mongodb+srv://movingeshop:9Ybf5lkE4RBuj3Va@cluster0.hv7xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

---

## Run the program

Please run:

```shell
node index.js
```
---
## Major files
[index.js](index.js): All GET and POST<br>
[database.js](database.js): Connect with MySQL server<br>
[login.ejs](login.ejs): Page to login<br>
[register.ejs](register.ejs): Page to register as a member<br>
[profile.ejs](profile.ejs): Users' personal information<br>
[home.ejs](home.ejs): Home Page<br>
[about.ejs](about.ejs): Page of our self-introduction<br>
[product.ejs](product.ejs): Page of listing all selling goods<br>
[productDetail.ejs](productDetail.ejs): Detail of a specific product<br>
[add.ejs](add.ejs): Page to upload a new product<br>
[controllers/users.js](controllers/users.js): Logic part of login, logout and register<br>
[routes/users.js](routes/users.js): Route part of login, logout and register<br>
[resolvers.js](resolvers.js): Logic part of GraphQL<br>

