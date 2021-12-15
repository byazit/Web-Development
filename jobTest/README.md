# Qvik - Node.js assignment.

##### Instruction to make it work:

1. I am using vagrant to run Ubuntu 18.04. Everything is running on Docker. Please make sure you have latest docker and docker-compose installed. 
1. Go to the folder and run
	* ```docker-compose down && docker-compose build && docker-compose up -d```
1. Find your machine ip. I am using port 80
	* ```ip a```
1. Go to the ip address and you will see JSON
1. I am using postman for REST.
1. Set URL
	* ```http://yourIp/api/v2/addMessage```
1. For creating new message, use POST method and choose Body->raw->JSON
	* ```
	{
		"name":"testTwo",
    	"message":"my message"
	}
	```	
1. Rest method under /set_max_age that takes an integer describing the number of seconds log messages, use GET method and URL
	* ```http://yourIp/api/v2/set_max_age/120```		

###### Feel free to contact with me if you find any error.
