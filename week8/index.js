let credentials = require('./credentials');
let express = require('express');
let bodyParser = require('body-parser');
let uidSafe = require('uid-safe');
let session = require('express-session');
let hbs = require('express-handlebars');
let memstore = require('memorystore')(session);

let app = express();
let exphbs = hbs.create({
  defaultLayout: 'main',
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
      return uidSafe.sync(32); // use UUIDs for session IDs
    },
    name: 'countryComparison',
    resave: true,
    saveUninitialized: false,
    secret: credentials.cookieSecret, 
    cookie: {
        secure: false,
    }, 
    store: new memstore({checkPeriod: 86400000}),
}
  
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 30000);
//app.use() MUST be called before assigning method handlers
//serve static content from this directory
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//set up the session
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
}

function homeHandler(req, res)
{
  context={};
  app.locals.title = "Home";
  let cke = req.session.cookie;
  if(cke)
  {
    req.session.previousVisit = req.session.lastVisited;
    req.session.lastVisited = Date.now();
  }
  else
  {
    req.session.previousVisit = null;
    req.session.lastVisited = Date.now(); 
  }
  res.render('home', req.session); 
}

app.listen(app.get('port'));
