package model

type Comment struct {
	CommentID int    `json:"CommentID,omitempty"`
	ProductID int    `json:"ProductID"`
	UserID    int    `json:"UserID"`
	Gender    string `json:"Gender"`
	Comment   string `json:"Comment"`
}
