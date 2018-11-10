var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = express();

//create experss handlebars instance
var exphbs = handlebars.create({
	defaultLayout: 'main'
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 44332);
//app.use() MUST be called before assigning method handlers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/week7', weekSevenHandler);
app.post('/week7', weekSevenHandler);

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

function weekSevenHandler(req, res)
{
	var context = {
    parseableQuery: false,
    parseableBody: false
  };
	
  context.requestMethod = req.method;

	if(Object.keys(req.query).length !== 0)
  {
    context.parseableQuery = true;
    let retArray = [];
    for(const k of Object.keys(req.query))
    {
      retArray.push({'field':k, 'value':req.query[k]});
    }
    context.queryFields = retArray;
  } 

  if(context.requestMethod == 'POST' && Object.keys(req.body).length !== 0) 
  {
    context.parseableBody = true;
    let retArray = [];
    for(const k of Object.keys(req.body))
    {
      retArray.push({'field':k, 'value':req.body[k]});
    }
    context.bodyFields = retArray;
  }
    
  res.render('home', context); 
}

app.listen(app.get('port'));

