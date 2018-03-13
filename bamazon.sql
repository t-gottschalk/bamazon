DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Winds of War", "books", 20, 10),
	("War and Remembrance", "books", 20, 10),
  ("Youngblood Hawke", "books", 20, 10),
	("A Farewell to Arms", "books", 20, 10),
	("A Moveable Feast", "books", 20, 10),
	("Pietà", "pictures", 10, 50),
	("Gates of Paradise", "pictures", 10, 50),
  ("Pantheon", "pictures", 10, 50),
  ("Trevi Fountain", "pictures", 10, 50),
  ("Siena Cathedral", "pictures", 10, 50),
	("The Creation of Adam", "prints", 10, 50),
  ("The Last Judgement", "prints", 10, 50),
  ("The Deluge", "prints", 10, 50),
  ("The Potato Eaters", "prints", 10, 50),
  ("Café Terrace at Night", "prints", 10, 50
);


SELECT * FROM products;

