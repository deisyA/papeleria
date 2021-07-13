CREATE DATABASE logs;

USE logs;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY auto_increment,
    user VARCHAR(50),
    name VARCHAR(100),
    rol VARCHAR(50),
    pass VARCHAR(255)

);

DESCRIBE users;