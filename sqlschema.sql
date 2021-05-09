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
  -- CONSTRAINT fk_Seller_Id FOREIGN KEY(seller) REFERENCES user(user_id) ON DELETE CASCADE,
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



INSERT INTO user (user_id, userName, account, email, pass) VALUES
  ("1", "John", "1", "John@gmail.com", "1"),
  ("2", "Jack", "2", "Jack@gmail.com", "2"),
  ("3", "Jane", "3", "Jane@gmail.com", "3"),
  ("4", "Mary", "4", "Mary@gmail.com", "4"),
  ("5", "Paul", "5", "Paul@gmail.com", "5"),
  ("6", "Alice", "6", "Alice@gmail.com", "6"),
  ("7", "Bob", "7", "Bob@gmail.com", "7"),
  ("8", "Linda", "8", "Linda@gmail.com", "8");


  INSERT INTO product (category, cproduct_id, productName, price, seller, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES
  ("Clothes",2, "tshirt", 10, 3, "4/28/2021","http:///2", "used", 2, "descript"),
  ("Furnitures",3, "tshirt3", 11, "608d163c8874dcc8fabfe514", "4/28/2021","http:///3", "used",1, "descript"),
  ("Clothes", 4, "tshir4", 12, 2, "4/28/2021","http:///4", "used", 6, "descript"),
  ("Clothes", 5, "tshir5", 103, "608d163c8874dcc8fabfe514", "4/28/2021","http:///5", "used",3, "descript"),
  ("Furnitures",6, "tshir6", 1, 2, "4/28/2021","http:///6", "used", 9, "descript");
