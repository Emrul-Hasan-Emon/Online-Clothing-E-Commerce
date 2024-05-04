CREATE TABLE Cart (
    CartID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    UserID INT,
    Size VARCHAR(255),
    Color VARCHAR(255),
    Quantity INT,
    TotalPrice DECIMAL(10, 2),
    Discount DECIMAL(10, 2),
    PayablePrice DECIMAL(10, 2)
);