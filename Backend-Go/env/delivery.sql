CREATE TABLE Delivery (
    DeliveryID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    UserID INT NOT NULL
);

CREATE TABLE DeliveryCount (
	DeliveryCountID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT NOT NULL,
	Quantity INT NOT NULL
);

INSERT INTO `User` (Name, PhoneNumber, Email, Gender, Address, Role, DateOfBirth, Password, IsDeleted, City, District) 
VALUES('Delivery Man 1', '01621876756', 'dm1@gmail.com', 'male', 'Rampura, Dhaka', 'delivery', '2024-4-29', 'abc', false, 'Dhaka', 'Dhaka');

INSERT INTO `User` (Name, PhoneNumber, Email, Gender, Address, Role, DateOfBirth, Password, IsDeleted, City, District) 
VALUES('Delivery Man 2', '01621871256', 'dm2@gmail.com', 'male', 'Rampura, Dhaka', 'delivery', '2024-4-29', 'abc', false, 'Dhaka', 'Dhaka');

INSERT INTO `User` (Name, PhoneNumber, Email, Gender, Address, Role, DateOfBirth, Password, IsDeleted, City, District) 
VALUES('Delivery Man 3', '01621871543', 'dm3@gmail.com', 'male', 'Rampura, Dhaka', 'delivery', '2024-4-29', 'abc', false, 'Dhaka', 'Dhaka');

INSERT INTO DeliveryCount (UserID, Quantity) VALUES (8, 0);
INSERT INTO DeliveryCount (UserID, Quantity) VALUES (9, 0);
INSERT INTO DeliveryCount (UserID, Quantity) VALUES (10, 0);