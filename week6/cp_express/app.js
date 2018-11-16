var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = express();

//create experss handlebars instance
var exphbs = handlebars.create({
  defaultLayout: 'main',
  partialsDir: "views/partials"
});
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 44332);
//app.use() MUST be called before assigning method handlers
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//const hostname = "charmingplumage.com";
app.locals.protocol = "http:";
app.locals.hostname = "localhost:44332";

//LAYOUT OBJECTS
app.locals.footerBreadCrumbs = { links: [
    {url:`${protocol}//${hostname}`, text:"Home"},
    {url:`${protocol}//${hostname}/authillus.html`, text:"Author and Illustrator"},
    {url:`${protocol}//${hostname}/book.html`, text:"The Book"},
    {url:`${protocol}//${hostname}/biosphere.html`, text:"Birds and the Biosphere"}
  ]
};

//ROUTES
app.get('/', homeHandler);
app.get('/book.html', bookHandler);

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

function homeHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: Home";
  context.subTitle = "A Book About Bird Revolution";
  res.render('home', context); 
}

function bookHandler(req, res)
{
  context={};
  app.locals.title = "Charming Plumage: The Book";
  res.render('book', context); 
}

/*
//PARTIALS
app.use(function(req, res, next)
{ 
  if(!res.locals.partials)
    res.locals.partials = {};
  res.locals.partials.footer.siteLinks = footerSiteLinks;
  next();
});
//DEBUG: 
exphbs.getPartials().then(function (partials) 
{ console.log(partials) });
*/
//END PARTIALS

app.listen(app.get('port'));

