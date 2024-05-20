CREATE TABLE Comment (
    CommentID INT AUTO_INCREMENT PRIMARy KEY,
    ProductID INT NOT NULL,
    UserID INT NOT NULL,
    Gender VARCHAR(100) NOT NULL,
    Comment VARCHAR(1000) NOT NULL
);

INSERT INTO Comment (ProductID, UserID, Gender, Comment) VALUES(44, 1, 'Male', 'Good');