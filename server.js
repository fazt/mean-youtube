const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// routes
const index = require('./routes/index');
const tasks = require('./routes/tasks');

const PORT = 3000;

const app = express();

// express configurations

app.set('port', process.env.PORT || PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () =>{
 console.log('server on port', app.get('port'));
});

