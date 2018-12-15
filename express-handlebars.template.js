//put passwords and api keys in credentials.js and don't check it in
const credentials = require('./credentials');
const appName = "foo";
let request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('express-session');

var app = express();
/*create experss handlebars instance; the debug helper should be moved to a
helpers file and imported if app.get('env') == 'dev' */ 
var exphbs = handlebars.create({
  defaultLayout: 'main',
  partialsDir: "views/partials",
  helpers: {
    debug: function(optionalValue){
      console.log("Current Context");
      console.log("====================");
      console.log(this);

      if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
      }
    }
  }
});

var sessionCfg = {
  //this is for generating session IDs
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  name: appName,
  resave: true,
  saveUnitialized: true,
  secret: credentials.cookieSecret,
  store: MemoryStore
}

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 32323);
//app.use() MUST be called before assigning method handlers
//serve static content from this directory
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session(sessionCfg));

//LAYOUT OBJECTS
app.locals = {};

//ROUTES
app.get('/', homeHandler);
app.post('/subscribe', subscriptionHandler);

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

function subscriptionHandler(req, res)
{
    ...
}

function homeHandler(req, res)
{
  context={};
  app.locals.title = "Home"
  res.render('home', context); 
}

app.listen(app.get('port'));
