CREATE DATABASE IF NOT EXISTS dbtest;

USE dbtest;

CREATE TABLE IF NOT EXISTS users(
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

INSERT INTO users(name, email, password) VALUES
("John Doe Test", "john@doe.com", "johndoe123"),
("Jean Grey Test", "jean@grey.com", "jeangrey123");
