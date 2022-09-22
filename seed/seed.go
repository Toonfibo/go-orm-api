package main

import (
	"crud/go-orm-api/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)



func main() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root@tcp(127.0.0.1:3306)/go_orm?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&model.User{})

	// Create
	db.Create(&model.User{Fname: "test1", Lname: "100", Username: "test",Avatar: "https://www.melivecode.com/users/1.png"})
	db.Create(&model.User{Fname: "test2", Lname: "100", Username: "test",Avatar: "https://www.melivecode.com/users/2.png"})
	db.Create(&model.User{Fname: "test3", Lname: "100", Username: "test",Avatar: "https://www.melivecode.com/users/3.png"})

	
}
