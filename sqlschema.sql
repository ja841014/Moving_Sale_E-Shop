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

INSERT INTO product (category, product_id, productName, price, seller, boughtDate, product_photo, look_like, numberOfProduct, descript) VALUES
("Furnitures",1,"Floor lamp",35,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620603844/MovingSale/kb2dr6wwehw7oinyj36i.png","Look like new",1,"Dark gray floor lamp with 3 led bulbs."),
("Furnitures",2,"Table",5,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620603992/MovingSale/xap1jd6un9ueyoookl49.png","Used",2,"Black table. Size: 150x75x73(cm)"),
("Furnitures",3,"Chair",25,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604105/MovingSale/vblgfxbywxkma1fucpsg.png","Used",2,"Chair with wheels. Height is adjustable."),
("Furnitures",4,"Dinning table and chairs",60,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604202/MovingSale/mees9ankxo5q6v9jnydy.png","Look like new",1,"One table with four chairs."),
("Furnitures",5,"Bed frame and mattress",150,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604334/MovingSale/zfhzm0ckuuuf1ekohqak.png","Look like new",1,"Queen size white bed frame with carefully covered mattress."),
("Furnitures",6,"Acer 23.8 monitor",60,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604404/MovingSale/sk1kcgqqdxyfqfoa9rdx.png","Look like new",1,"Acer 23.8 16:9 IPS monitor"),
("Furnitures",7,"3-in-1 indoor grill",15,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604505/MovingSale/hdtsdpqgghimd8x0aw8e.png","Look like new",1,"Great for grilling or hot pot"),
("Furnitures",8,"Shoe rack",5,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604547/MovingSale/awshq80ffmqqoihcalim.png","Look like new",1,"Black metal shoe rack."),
("Furnitures",9,"Stick vacuum",25,"6098527ebdc11e0c1cc34cb1","2019/12","https://res.cloudinary.com/ja841014/image/upload/v1620604597/MovingSale/yinq8jpp20gfeyevmz5d.png","Used",1,"Stick bagless vacuum cleanser"),
("Furnitures",10,"Shelf",10,"6098527ebdc11e0c1cc34cb1","2019/09","https://res.cloudinary.com/ja841014/image/upload/v1620604696/MovingSale/rndpp7airay8v52tzq2d.png","Used",1,"Cube organizer with two baskets"),
("Clothes",11,"T-shirt",999,"6098527ebdc11e0c1cc34cb1","2021/02","https://res.cloudinary.com/ja841014/image/upload/v1620607077/MovingSale/mabhy7xsy1meq270al9c.png","Look like new",1,"Stayreal Year of Cow T-shirt"),
("Clothes",12,"Blue t-shirt",10,"6098527ebdc11e0c1cc34cb1","2021/04","https://res.cloudinary.com/ja841014/image/upload/v1620607114/MovingSale/jwldbh6et0lldxhmijdq.png","Look like new",1,"Plain blue t-shirt"),
("Clothes",13,"Denim skirt",10,"6098527ebdc11e0c1cc34cb1","2020/06","https://res.cloudinary.com/ja841014/image/upload/v1620607173/MovingSale/kcudi7cu7xfyu3bldnk3.png","Used",1,"Long denim skirt");

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
