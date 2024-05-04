CREATE TABLE Order_Address (
  OrderAddressID INT AUTO_INCREMENT,
  OrderID INT NOT NULL,
  Name VARCHAR(255) NOT NULL,
  Contact VARCHAR(20) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  City VARCHAR(100) NOT NULL,
  District VARCHAR(100) NOT NULL,
  PRIMARY KEY (OrderAddressID)
);