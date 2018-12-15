module.exports = {
  getCountryForName,
}

let request = require('request');

const baseUrl = 'https://restcountries.eu/rest/v2/';
let baseOptions = {fields: ['area','population']};

function getCountryForName(name)
{
    const endPoint = 'name/';
    const restUrl = baseUrl + endPoint;
    requeset(restUrl, function(error, response, ));

}