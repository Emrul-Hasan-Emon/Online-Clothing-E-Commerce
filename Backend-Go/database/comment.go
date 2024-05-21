package database

import "github.com/Emrul-Hasan-Emon/repositories/ecommerce/model"

func (db *Database) FetchComments(ProductID int) ([]model.Comment, error) {
	query := "SELECT * FROM online_clothing_management_system.Comment WHERE ProductID = ?"
	rows, err := db.db.Query(query, ProductID)
	if err != nil {
		return []model.Comment{}, err
	}
	var comments []model.Comment
	for rows.Next() {
		var comment model.Comment
		err := rows.Scan(
			&comment.CommentID,
			&comment.ProductID,
			&comment.UserID,
			&comment.Gender,
			&comment.Comment,
		)
		if err != nil {
			return []model.Comment{}, err
		}
		comments = append(comments, comment)
	}
	return comments, nil
}

func (db *Database) WriteComment(comment model.Comment) error {
	stmt, err := db.db.Prepare("INSERT INTO online_clothing_management_system.Comment (ProductID, UserID, Gender, Comment) VALUES(?, ?, ?, ?)")
	if err != nil {
		return err
	}
	_, err = stmt.Exec(comment.ProductID, comment.UserID, comment.Gender, comment.Comment)
	if err != nil {
		return err
	}
	return nil
}
