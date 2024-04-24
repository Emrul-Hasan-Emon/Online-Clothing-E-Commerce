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

 -- Add a new column named "Gender" to the existing table
ALTER TABLE Products ADD COLUMN Gender VARCHAR(255) NOT NULL DEFAULT 'Male';

ALTER TABLE Products ADD COLUMN Description VARCHAR(1000) NOT NULL DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, assumenda? Id consequatur totam necessitatibus animi eius iusto quia laboriosam eum laudantium hic! Rem, commodi praesentium harum officia porro autem incidunt ad aspernatur laboriosam at fugit debitis ipsa, recusandae veniam voluptatem, quaerat necessitatibus placeat eligendi! Fugit, natus rerum, molestias neque officiis, quam vitae eum quod sint eius in. Accusantium neque explicabo corrupti maiores iure culpa repudiandae rerum!';

-- Insert into Products Table
INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES 
('Kurtas-1', 'A', 'kurtas', 'kurtas', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Kurtas-2', 'B', 'kurtas', 'kurtas', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Kurtas-3', 'C', 'kurtas', 'kurtas', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Kurtas-4', 'D', 'kurtas', 'kurtas', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Kurtas-5', 'E', 'kurtas', 'kurtas', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
  
 INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES 
('Shirt-1', 'A', 'shirt', 'shirt', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Shirt-2', 'B', 'shirt', 'shirt', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Shirt-3', 'C', 'shirt', 'shirt', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Shirt-4', 'D', 'shirt', 'shirt', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Shirt-5', 'E', 'shirt', 'shirt', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
  
  INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES 
('Pants-1', 'A', 'pants','pants', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Pants-2', 'B','pants', 'pants', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Pants-3', 'C', 'pants', 'pants', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Pants-4', 'D', 'pants', 'pants', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Pants-5', 'E', 'pants', 'pants', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
  
 INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES
('Sweaters-1', 'A', 'sweaters', 'sweaters', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Sweaters-2', 'B', 'sweaters', 'sweaters', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Sweaters-3', 'C', 'sweaters', 'sweaters', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Sweaters-4', 'D', 'sweaters', 'sweaters', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Sweaters-5', 'E', 'sweaters', 'sweaters', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
  
 INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES
('T-shirts-1', 'A', 't-shirts', 't-shirts', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('T-shirts-2', 'B', 't-shirts', 't-shirts', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('T-shirts-3', 'C', 't-shirts', 't-shirts', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
  
  INSERT INTO Products (Name, Brand, Category_id, Category, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl)
VALUES
('Jackets-1', 'A', 'jackets', 'jackets', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Jackets-2', 'B', 'jackets', 'jackets', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, ''),
('Jackets-3', 'C', 'jackets', 'jackets', 2000, '["White", "Blue", "Black", "Brown", "Green", "Purple", "Yellow", "Orange"]', 
 '[{"name": "S", "quantity": 20},{"name": "L", "quantity": 20},{"name": "M", "quantity": 20},{"name": "XL", "quantity": 20},{"name": "XXL", "quantity": 20}]',
  true, 100, 70, '');
