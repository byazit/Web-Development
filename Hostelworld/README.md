# Hostelworld NodeJS Bootstrap

## Requirements
If not already done, [install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started
Clone the project and run the following commands inside the project folder: 
```
cd docker

docker-compose up
```

* When those containers are ready, you can start to open http://localhost
* Two containers will be created: database and nodejs.
* The database will be already preloaded with the required data.

## Probing the project
```
curl -i http://0.0.0.0:8081
```

## Challenge
* Create a branch using the fistname-lastname-YYYY-MM-DD format and use this branch to put your code
* Create an endpoint(s) that given a country id or name, it returns all the foreign countries that have a route connecting to any airport of the given country;
* The country id is an integer and country name is a string, this parameter should be validated for errors;
* Install any packages that is seen necessary;
* The code should have the necessary **unit tests**;
* The response should be in **JSON** format following this format:
```
{
    sucess: true|false
    data: object
    message: 'error message if any'
}
```

### Examples:
* http://localhost/country/england/routes
* http://localhost/country/3/routes
 ```
 {
     sucess: true
     data: [
        {
            airportId:111,
            cityId:123,
            cityName: 'abc',
            countryName: 'xyz'
        },
        {
            airportId:555,
            cityId:345,
            cityName: 'foo',
            countryName: 'bar'
        },
        {
            airportId:222,
            cityId:456,
            cityName: 'zzz',
            countryName: 'yyy'
        }
    ]
 }
 ```
* http://localhost/country/3abc/routes
 ```
 {
     sucess: false
     data: null,
     message: 'Invalid Country ID or Name'
 }
 ```
