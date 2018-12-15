const credentials = require('./credentials');
const nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();
//create experss handlebars instance
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

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 32323);
//app.use() MUST be called before assigning method handlers
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* for Nodemailer */
var transporter = nodemailer.createTransport({ 
  host: 'smtp.sendgrid.net',
  secureConnection: true,
  port: 465,
  auth: { 
    user: 'apikey',
    pass: credentials.sendgrid_api_key,
} });

/* transporter.verify(function(error, success) {
  if (error) {
       console.log(error);
  } else {
       console.log('Server is ready to take our messages');
  }
}); */
/* end mail testing */

//LAYOUT OBJECTS
app.locals.footerBreadCrumbs = { links: [
    {url:"/", text:"Home"},
    {url:"/authillus.html", text:"Author and Illustrator"},
    {url:"/book.html", text:"The Book"},
    {url:"/biosphere.html", text:"Birds and the Biosphere"}
  ]
};

//ROUTES
app.get('/', homeHandler);
app.get('/book.html', bookHandler);
app.get('/authillus.html', authillusHandler);
app.get('/biosphere.html', biosphereHandler);
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
  if(req.method == 'POST' && Object.keys(req.body).length !== 0)
  {
    let subscriberName = req.body.name;
    let subscriberEmail = req.body.email;
    //let subscriberConfirm = req.body.confirm;

    if(validateEmail(subscriberEmail)) //&&  validateName <-- how to do this in Unicode?
    {
      let message = {
        from: subscriberEmail,
        to: 'charmingplumage@gmail.com',
        subject: 'early reader request',
        text: `My name is ${subscriberName} and I'd like to be an early reader of your book.`
      };
      transporter.sendMail(message, function(err, info){
        let context = {};
        if(info.accepted.length > 0)
        {
          context.success = info;
          context.mailInfo = info;
        }
        else if(err)
        {
          context.mailError = err;
          context.failure = true;
        }
          res.render('subscribeResult', context)
      });
    }
    else
    {
      context.error = "The email you provided was found to be invalid."; 
      res.render('subscribeResult', context);
    }
  }
}

/* regex taken from https://stackoverflow.com/a/46181/148680 */
function validateEmail(email) {
  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regex = new RegExp(re);
  return regex.test(email);
}

function homeHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: Home";
  context.subTitle = "A Book About Bird Revolution";
  res.render('home', context); 
}

function authillusHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: Author and Illustrator";
  res.render('authillus', context); 
}

function bookHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: The Book";
  res.render('book', context); 
}

function biosphereHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: Birds and the Biosphere";
  res.render('biosphere', context); 
}

app.listen(app.get('port'));

