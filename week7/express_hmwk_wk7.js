var express = require('express');
var handlebars = require('express-handlebars');
var app = express();

//create experss handlebars instance
var exphbs = handlebars.create({
	helpers: {
		queryHelper: funcQueryHelper,
	 	bodyHelper: funcBodyHelper
	},
	defaultLayout: 'main'
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('port', 44332);

app.get('/week7', week7Handler);
app.post('/week7', week7Handler);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

function week7Handler(req, res)
{ 
	var context = {parseableQuery: true};
	
	if(Object.keys(req.query).length === 0 && req.query.constructor === Object)
		context.parseableQuery = false;
  
	context.requestMethod = req.method;
	context.queryFields = req.query;
  
	res.render('home', context);
}

//HELPERS
function funcQueryHelper(queryFields, options)
{
	var retVal = ""
	for (const k of Object.keys(queryFields))
	{
		retVal = retVal + '<tr><td>'+k+'</td><td>'+queryFields[k]+'</td></tr>';	
	}
	return retVal;
}

function funcBodyHelper(rb)
{
}

app.listen(app.get('port'));


