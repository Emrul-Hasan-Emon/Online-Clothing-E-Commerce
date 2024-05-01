CREATE TABLE Category (
  CategorySL int AUTO_INCREMENT,
  CategoryID VARCHAR(255) NOT NULL,
  CategoryName VARCHAR(255) NOT NULL,
  Gender VARCHAR(50) NOT NULL,
  PRIMARY KEY (CategorySL)
);


-- Inserting Some Category for Female
INSERT INTO Category (CategoryID, CategoryName, Gender)
VALUES ('borkha', 'Borkha', 'Female');

INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('tops', 'Tops', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('pants', 'Pants', 'Female');

INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('Sweaters', 'Sweaters', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('t-Shirts', 'T-Shirts', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('jackets', 'Jackets', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('gouns', 'Gouns', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('sarees', 'Sarees', 'Female');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('Kurtas', 'Kurtas', 'Female');

-- Inserting Some Category for Male

INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('kurtas', 'Kurtas', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('shirt', 'Shirt', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('pants', 'Pants', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('sweaters', 'Sweaters', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('t-shirts', 'T-Shirts', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('jackets', 'Jackets', 'Male');
INSERT INTO Category (CategoryID, CategoryName, Gender) VALUES ('activewear', 'Activewear', 'Male');

-- See everything from category details
SELECT * FROM Category;