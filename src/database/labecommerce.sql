-- Active: 1688661518083@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

PRAGMA table_info('users');
SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u001", "Cride", "cride@gmail.com", "Cride1", "06/07/2023"),
("u002", "Fride", "fride@gmail.com", "Fride2", "07/07/2023"),
("u003", "Bride", "bride@gmail.com", "Bride3", "08/07/2023");


CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

PRAGMA table_info('products');

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES  ("p001", "Monitor", 200, "Amazing Monitor 4k full HD.", "https://fakeimg.pl/600x400?text=monitor"),
        ("p002", "Mouse", 20, "Perfect mouse gamer.", "https://fakeimg.pl/600x400?text=mouse"),
        ("p003", "MacAir", 800, "Incredible mac air.", "https://fakeimg.pl/600x400?text=macair");
INSERT INTO products (id, name, price, description, image_url)
VALUES  ("p004", "Keyboard", 200, "Perfect keyboard gamer", "https://fakeimg.pl/600x400?text=keyboard"),
        ("p005", "Headphones", 30, "Smooth sound.", "https://fakeimg.pl/600x400?text=headphones");
        
        
SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%mouse%';

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u004", "Tride", "tride@gmail.com", "Tride05", "10/07/2023");

INSERT INTO products (id, name, price ,description, image_url)
VALUES ("prod006", "Carregador", 10,"Carrega bem.", "https://fakeimg.pl/600x400?text=carregador");

DELETE FROM users WHERE id = "u004";

DELETE FROM products WHERE id = "prod006";

UPDATE users
SET name = "Dride",
 email = "dride@gmail.com",
 password = "Dride3"
 WHERE id = "u003";

INSERT INTO users(id, name, email, password, created_at)
VALUES("u004", "Kride", "kride@gmail.com", "Kdride4", DATE('now') );

SELECT id AS key, name AS usuario FROM users 
WHERE name = "Cride" ;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    create_at TEXT NOT NULL,
    
    Foreign Key (buyer) REFERENCES users(id)
);

DROP TABLE purchases;


INSERT INTO purchases (id, buyer, total_price, create_at)
VALUES  ("pch01", "u001", 200, DATE('now')),
        ("pch02", "u002", 300, DATE('now')),
        ("pch03", "u003", 400, DATE('now')); 
        

UPDATE purchases 
SET total_price = 500
WHERE id = "pch03";

SELECT * FROM purchases;

SELECT purchases.id,
        purchases.buyer,
        users.name,
        users.email,
        purchases.total_price,
        purchases.create_at
FROM purchases
INNER JOIN users 
ON purchases.buyer = users.id;


CREATE TABLE purchased_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    
   Foreign Key (purchase_id) REFERENCES purchases(id)
   Foreign Key (product_id) REFERENCES products(id)
);