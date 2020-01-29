var config = {
    database: {
        host:      '172.17.0.2',     // database host
        user:       'byazit',         // your database username
        password: 'byazit3417',         // your database password
        port:       3306,         // default MySQL port
        db:       'mynode'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
}
 
module.exports = config

/* 
module.exports = config

CREATE TABLE users (
id int(11) NOT NULL auto_increment,
name varchar(100) NOT NULL,
age int(3) NOT NULL,
email varchar(100) NOT NULL,
PRIMARY KEY (id)
);
*/
