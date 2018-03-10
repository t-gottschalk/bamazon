DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Winds of War", "books", 20, 10),
	("War and Remembrance", "books", 20, 10),
    ("Youngblood Hawke", "books", 20, 10),
	("A Farewell to Arms", "books", 20, 10),
	("A Moveable Feast", "books", 20, 10),
	("Pietà", "renaissance", 10, 50),
	("Gates of Paradise", "renaissance", 10, 50),
	("The Last Judgement", "renaissance", 10, 50),
	("The Creation of Adam", "renaissance", 10, 50),
    ("The Deluge", "renaissance", 10, 50),
    ("The Potato Eaters", "impressionism", 10, 100),
    ("Café Terrace at Night", "impressionism", 10, 100),
    ("The Bedroom", "impressionism", 10, 100),
    ("Fourteen Sunflowers in a Vase", "impressionism", 10, 100),
	("The Night Café", "impressionism", 10, 100);



SELECT * FROM products;

SELECT * FROM test;







