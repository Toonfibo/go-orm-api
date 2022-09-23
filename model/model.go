package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	 ID  uint
	Username string
	Fname    string
	Lname    string
	Avatar   string
}
