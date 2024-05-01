CREATE TABLE Category (
  CategorySL int AUTO_INCREMENT,
  CategoryID VARCHAR(255) NOT NULL,
  CategoryName VARCHAR(255) NOT NULL,
  Gender VARCHAR(50) NOT NULL,
  PRIMARY KEY (CategorySL)
);



-- Inserting Some Category for Female
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('borkha', 'Borkha', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('tops', 'Tops', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('pants', 'Pants', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('Sweaters', 'Sweaters', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('t-Shirts', 'T-Shirts', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('jackets', 'Jackets', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('gouns', 'Gouns', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('sarees', 'Sarees', 'Women');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('Kurtas', 'Kurtas', 'Women');

-- Inserting Some Category for Male

INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('kurtas', 'Kurtas', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('shirt', 'Shirt', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('pants', 'Pants', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('sweaters', 'Sweaters', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('t-shirts', 'T-Shirts', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('jackets', 'Jackets', 'Men');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('activewear', 'Activewear', 'Men');

-- See everything from category details
SELECT * FROM Category;