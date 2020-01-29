const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var myConnection  = require('express-myconnection');
var expressValidator = require('express-validator');
var methodOverride = require('method-override')
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path=require('path');

const app = express();
const port = process.env.PORT || 5000;

var config = require('./config')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
}
app.use(myConnection(mysql, dbOptions, 'pool'))
var index = require('./routes/index')
var users = require('./routes/users')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.name+req.body.email}`,
  );
});
app.set('views', path.join(__dirname, './src/components')); 
app.use('/users', users)

app.listen(port, () => console.log(`Listening on port ${port}`));