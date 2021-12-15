# Qvik - Node.js assignment.

##### Instruction to make it work:

1. I am using vagrant Ubuntu 18.04. Everything is running on Docker. Please make sure you have latest docker and docker-compose installed. 
1. Go to my folder and run
	* ```docker-compose down && docker-compose build && docker-compose up -d```
1. Login to your PSQL
	* ```psql postgres --u postgres```
1. Create a new user 
	* ```CREATE ROLE nodeauth WITH LOGIN PASSWORD 'swedennodeauth';```
1. Give the user access to create new Database
	* ```ALTER ROLE nodeauth CREATEDB;```
1. Logout from PSQL
	* ```\q```
1. Login back to PSQL with your new user
	* ```psql postgres -U nodeauth```
1. Create new database
	* ```CREATE DATABASE authnode;```
1. Grant all access to your new user
	* ```GRANT ALL PRIVILEGES ON DATABASE secure_node TO nodeauth;```
1. Logout from PSQL
	* ```\q```
1. Change file config/config.js as you setup your PSQL authentication
1. Avoid it if you are not adding new table(s). Run ```sequelize db:create``` ```sequelize migration:generate``` it should create table user and product for the first time.
1. Run ```npm run prestart```
1. Run ```npm run dev```
1. Fire up postman and create your first user
	* in Headers add Content-Type application/x-www-form-urlencoded
	* select POST and send localhost:3000/api/singup
	* in Body choose x-www-form-urlencoded and paste {"username":"test@email.com", "password":"12345678"}
	* Click send
	* you should get success response
1. Now time to signin! In postman
	* select POST localhost:3000/api/signin
	* in Body choose raw and paste {"username":"test@email.com", "password":"12345678"}
	* Click send
	* you should get success: true and token value in response
1. Time to add product. In postman
	* select POST localhost:3000/api/product
	* in Headers add; Authorization and value that you got response as token value
	* in Body choose raw and paste {"prod_name":"Apple","prod_desc":"I am apple.","prod_price":"1000"}
	* Click send 
	* your product should added
1. To see the product you added.
	* select GET localhost:3000/api/product
	* in Headers add; Authorization and value that you got response as token value
	* Click send
	* you should get all products list
1. To see specific product you added.
	* select GET localhost:3000/api/product/1
	* in Headers add; Authorization and value that you got response as token value
	* Click send
	* you should get the selected product
1. Update your product.
	* select PUT localhost:3000/api/v2/product/1
	* in Headers add; Authorization and value that you got response as token value
	* in Body select x-www-form-urlencoded
	* add this 
		```
		"prod_name","value":"mango"
		"prod_desc","value":"New description"
		"prod_price","value":"2000"
		```
	* Follow step 18 to see the update of your product
	
1. Delete your product.
	* select DELETE localhost:3000/api/product/1
	* in Headers add; Authorization and value that you got response as token value
	* Click send
	* your selected product should get deleted
###### I am following this tutorial: https://www.djamware.com/post/5bf94d9a80aca747f4b9ce9f/secure-nodejs-expressjs-and-postgresql-api-using-passportjs
