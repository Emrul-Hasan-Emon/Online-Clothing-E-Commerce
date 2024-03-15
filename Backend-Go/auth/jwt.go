package auth

import (
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte("secret-key")

type JWTParser struct {
	token string
	parts []string
}

func NewJWTParser(token string) *JWTParser {
	return &JWTParser{token, strings.Split(token, ".")}
}

func (jt *JWTParser) VerifyToken() error {
	token, err := jwt.Parse(jt.token, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("invalid token")
	}
	return nil
}

func CreateJWTToken(username string) (string, error) {
	return "", nil
}
