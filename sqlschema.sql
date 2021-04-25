CREATE TABLE user(
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  userName VARCHAR(40) NOT NULL CHECK (userName <> ''),
  account VARCHAR(40) NOT NULL CHECK (account <> ''),
  email VARCHAR(50) NOT NULL CHECK (email <> ''),
  pass VARCHAR(50) NOT NULL CHECK (pass <> ''),
  PRIMARY KEY (user_id)
);

CREATE TABLE product(
  product_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL CHECK (product_name <> ''),
  price INT NOT NULL CHECK (price <> ''),
  seller INT UNSIGNED NOT NULL,
  buyer INT,
  image1 VARCHAR(150) NOT NULL CHECK (image1 <> ''),
  image2 VARCHAR(150),
  image3 VARCHAR(150),
  CONSTRAINT fk_Seller_Id FOREIGN KEY(seller) REFERENCES user(user_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id)
);

INSERT INTO user (user_id, userName, account, email, pass) VALUES
  (1, "John", "1", "John@gmail.com", "1"),
  (2, "Jack", "2", "Jack@gmail.com", "2"),
  (3, "Jane", "3", "Jane@gmail.com", "3"),
  (4, "Mary", "4", "Mary@gmail.com", "4"),
  (5, "Paul", "5", "Paul@gmail.com", "5"),
  (6, "Alice", "6", "Alice@gmail.com", "6"),
  (7, "Bob", "7", "Bob@gmail.com", "7"),
  (8, "Linda", "8", "Linda@gmail.com", "8");


  INSERT INTO product (product_id, product_name, price, seller, image1, image2) VALUES
  (2, "tshirt", 10, 3, "http:///2","http://2"),
  (3, "tshirt3", 11, 1, "http:///3","http://3"),
  (4, "tshir4", 12, 2, "http:///4","http://4"),
  (5, "tshir5", 103, 1, "http:///5","http://5"),
  (6, "tshir6", 1, 2, "http:///6","http://6")
