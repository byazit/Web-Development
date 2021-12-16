# Qvik - Node.js assignment.

##### Instruction to make it work:

1. I am using vagrant to run Ubuntu 18.04. Everything is running on Docker. Please make sure you have latest docker and docker-compose installed. 
1. Go to the folder name nodejs->generic_nodejs and rename .envDev to .env
1. Get out from the folder nodejs->generic_nodejs to base folder and run
	* ```docker-compose down && docker-compose build && docker-compose up -d```
1. Execute below command to enter into nodejs container
	* ```docker exec -it nodejs_qvik bash```
1. Run this command to initialize sequelize
	* ```npx sequelize db:migrate```
1. Find your machine ip. 
	* ```ip a```
1. I am using postman for REST. Open postman and use this as URL to set max age value
	* ```http://yourMachineIp/api/v2/maxAge```
1. Use POST method and choose Body->raw->JSON
	```
	{
    "limit":"100"
	}
	```
1. Go to the ip address and you will see JSON
1. For adding new message, set the URL
	* ```http://yourMachineIp/api/v2/addMessage```
1. For creating new message, use POST method and choose Body->raw->JSON
	```
	{
		"name":"testTwo",
    	"message":"my message"
	}
	```	
1. Every new message will check current date to find existing log, if no log found. It will create new log. Per day 1 log, contain several message.
1. Rest method under /set_max_age that takes an integer describing the number of seconds log messages, use GET method and URL
	* ```http://yourMachineIp/api/v2/set_max_age/120```
1. If you want to update maxAge, use this as URL as PUT
	* ```http://yourMachineIp/api/v2/updateMaxAge```
1. For creating new message, use PUT method and choose Body->raw->JSON
	```
	{
    "limit":"700"
	}
	```		
1. If you want to see all messages, use this as URL as GET
	* ```http://yourMachineIp/api/v2/getMessage```
1. If you want to see all logs, use this as URL as GET
	* ```http://yourMachineIp/api/v2/getLog```
1. If you want to see max age, use this as URL as GET
	* ```http://yourMachineIp/api/v2/getMaxAge```
			
###### Feel free to contact with me if you find any error.
