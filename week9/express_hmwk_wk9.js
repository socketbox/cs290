//Change ENV to 'DEV' or 'PROD' depending on environment
const ENV = 'DEV';
var cfg;
if(ENV == 'DEV')
  cfg = require('./sec_env.js').dev;
else
  cfg = require('./sec_env.js').prod;
//END CFG

//IMPORTS
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var backend = require('./backend.js');
//END IMPORTS

var app = express();

//create express handlebars instance
var exphbs = handlebars.create({
	defaultLayout: 'main'
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 50701);
app.use(express.static('static'));
//app.use() MUST be called before assigning method handlers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', init);
app.post('/update', updateRow);
app.post('/delete', deleteRow);
app.post('/insert', insertRow);
app.post('/reset', resetTable);

//error handlers must come last
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

var dateFormatOpts = {year: 'numeric', month: 'numeric', day: '2-digit'};

function init(req, res, next)
{
  let context = {result: null};
  backend.initialQuery().then(function(result){
    result.forEach(element => {
      element.date = element.date.toLocaleDateString('en-US', dateFormatOpts);
    });
    context.result = result;
    res.render('home', context);
  });
}

function insertRow(req, res, next)
{
  let context = {sqlResult: null, reqBody: null };
  context.reqBody = req.body;
  backend.insertRow(req.body).then(function(result){
    //DEBUG console.log(result); 
    context.sqlResult = result;
    if(context.sqlResult.affectedRows == 1)
    {
      context['layout'] = false;
      //had to force this b/c express-handlebars treats "0" as true 
      context.reqBody[4] = context.reqBody[4] == 1 ? true : false; 
      res.render('row', context);
    }
  });
}

function updateRow(req, res, next)
{
  let context = {sqlResult: null, reqBody: null };

  let dateObj = new Date(req.body[3]);
  let dateStr = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
  req.body[3] = dateStr;
  context.reqBody = req.body;
  
  backend.updateRow(req.body).then(function(result){
    //DEBUG console.log(result); 
    context.sqlResult = result;
    if(context.sqlResult.affectedRows == 1)
    {
      res.status('200').json(context);
    }
  }); 
}

function deleteRow(req, res, next)
{
  let rowId = req.body.rowId;
  backend.deleteRow(rowId);
  res.status('200').json({rowId: "row-"+rowId});
}

function resetTable(req, res, next)
{
  backend.truncateTable().then(function(result){
    res.status('200').json(result);
  });
}

app.listen(app.get('port'));
