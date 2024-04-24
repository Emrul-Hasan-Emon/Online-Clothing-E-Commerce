-- Create Database 
CREATE DATABASE online_clothing_management_system;

-- Create Products table
CREATE TABLE Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Brand VARCHAR(255) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    Category_id VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Colors JSON NOT NULL,
    Size JSON NOT NULL,
    InStock BOOLEAN NOT NULL,
    Quantity INT NOT NULL,
    Discount INT DEFAULT 0,
    ImageUrl VARCHAR(255) NOT NULL
);
