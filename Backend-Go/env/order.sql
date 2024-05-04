CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Name VARCHAR(255),
    Contact VARCHAR(255),
    Email VARCHAR(255),
    Address VARCHAR(255),
    City VARCHAR(255),
    District VARCHAR(255),
    PaymentNumber VARCHAR(255),
    TransactionNumber VARCHAR(255),
    TotalCost DECIMAL(10, 2),
    Discount DECIMAL(10, 2),
    ShippingCost DECIMAL(10, 2),
    PayableCost DECIMAL(10, 2),
    OrderStatis VARCHAR(100)
)