package main

import (
	"crud/go-orm-api/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/gin-contrib/cors"
)

func main() {

	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root@tcp(127.0.0.1:3306)/go_orm?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	r := gin.Default()
	r.GET("/users", func(c *gin.Context) {
		var users []model.User
		db.Find(&users)
		c.JSON(200, users)

	})

	r.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		var users model.User
		db.First(&users, id)
		c.JSON(200, users)
	})
	// create
	r.POST("users", func(c *gin.Context) {
		var user model.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		result := db.Create(&user)
		c.JSON(200, gin.H{"RowsAAffected": result.RowsAffected})

	})
	//Delete
	r.DELETE("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		var users model.User
		db.First(&users, id)
		db.Delete(&users)
		c.JSON(200, users)

	})

	r.PUT("users", func(c *gin.Context) {
		var user model.User
		var updatedUser model.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.First(&updatedUser, user.ID)
		updatedUser.Fname =user.Fname
		updatedUser.Lname =user.Lname
		updatedUser.Username =user.Username
		updatedUser.Avatar =user.Avatar
		db.Save(updatedUser)

		c.JSON(200, updatedUser)

	})
	// config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}
	r.Use(cors.Default())

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
