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

-- Saree
INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Saree-1', 'A', 'Saree', 'saree', 2550, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 12}, {"Name": "M", "Color": "Black", "Quantity": 23}]', 1, 35, 5, 'assets/Women/Saree/saree_1.jpeg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Saree-2', 'B', 'Saree', 'saree', 3250, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 0, 'assets/Women/Saree/saree_2.jpeg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

-- Borkha
INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Borkha-1', 'A', 'Borkha', 'borkha', 2000, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 20, 'assets/Women/Borkha/borkha_1.jpeg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Borkha-2', 'B', 'Borkha', 'borkha', 1500, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 0, 'assets/Women/Borkha/borkha_2.jpeg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Borkha-3', 'C', 'Borkha', 'borkha', 1250, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 0, 'assets/Women/Borkha/borkha_3.webp', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

-- Men's Sweater
INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Sweater-1', 'A', 'Sweater', 'sweater', 2550, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 12}, {"Name": "M", "Color": "Black", "Quantity": 23}]', 1, 35, 5, 'assets/Men/Sweater/sweater_1.jpg', 'Men', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Sweater-2', 'B', 'Sweater', 'sweater', 3250, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 0, 'assets/Men/Sweater/sweater_2.jpg', 'Men', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

-- Women's Sweater
INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Sweater-1', 'A', 'Sweater', 'sweater', 2550, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 12}, {"Name": "M", "Color": "Black", "Quantity": 23}]', 1, 35, 5, 'assets/Women/Sweater/sweater_1.jpg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

INSERT INTO Products (Name, Brand, Category, Category_id, Price, Colors, Size, InStock, Quantity, Discount, ImageUrl, Gender, Description)
VALUES ('Sweater-2', 'B', 'Sweater', 'sweater', 3250, '[]', '[{"Name": "S", "Color": "Black", "Quantity": 43}, {"Name": "M", "Color": "Black", "Quantity": 17}]', 1, 60, 0, 'assets/Women/Sweater/sweater_2.jpeg', 'Women', '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, dolore tempora! Accusamus sint dolorum, dicta assumenda nostrum optio architecto nam perferendis similique tempora at quos atque ullam natus doloremque reiciendis.');

