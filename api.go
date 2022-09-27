package main

import (
	"crud/go-orm-api/model"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", " Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/users", func(c *gin.Context) {
		var users []model.User
		db.Find(&users)
		c.JSON(200, users)

	})

	r.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")

		var users model.User
		
		db.First(&users, id)
		
		  
		c.JSON(http.StatusOK, gin.H{"status":"ok","users":users ,"message":"User :"+id,})
		//c.JSON(http.StatusOK, &users)
		//c.JSON(http.StatusOK,gin.H{"status":"ok","message":"User :"+id,})

	})
	// create
	r.POST("/users/create", func(c *gin.Context) {

		var users model.User

		if err := c.ShouldBindJSON(&users); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&users)

		//c.JSON(http.StatusOK,users)
		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Created User successfully"})
		//c.JSON(http.StatusOK)
		// result := db.Create(&users)
		//c.JSON(200, gin.H{"RowsAAffected": result.RowsAffected})

	})
	//Delete
	r.DELETE("/users/delete/:id", func(c *gin.Context) {
		id := c.Param("id")
		var users model.User

		db.First(&users, id)
		db.Delete(&users)
		c.JSON(http.StatusOK, gin.H{"status": "ok","message": "Deleted  User successfully : "+id, })

	})
	

	//updated
	r.PUT("/users/update/", func(c *gin.Context) {
		
		var users model.User
		var updatedUser model.User
		if err := c.ShouldBindJSON(&users); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),})
			return
		}
		db.First(&updatedUser,users.ID)
		
		updatedUser.Fname = users.Fname
		updatedUser.Lname = users.Lname
		updatedUser.Username = users.Username
		updatedUser.Avatar = users.Avatar
		db.Save(&updatedUser)
		c.JSON(200, gin.H{"status": "ok", "message": "Updated User successfully ","user": updatedUser,})
		//c.JSON(200, updatedUser)

	})
	// config := cors.DefaultConfig()
	// config.AllowOrigins = []string{"*"}
	// r.Use(cors.Default())

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
