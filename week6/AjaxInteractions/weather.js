/*
 * author: Casey Boettcher
 * OID: boettchc
 * date: 2081-10-29
 * filename: weather.js
 * activity: Ajax Interactions
 */

const OWM_ENDPT = "https://api.openweathermap.org/data/2.5/weather"
const OWM_API_KEY = "9e3db8c8bcd6c6496674ab00ee7a6838"

function init()
{
  //bind event listeners to DOM
  document.getElementById("callWeatherApiCity").addEventListener('click', callWeatherApi); 
  document.getElementById("callWeatherApiZip").addEventListener('click', callWeatherApi); 
  
	document.getElementById("tempMetric").addEventListener('click', changeTempLabelUnits); 
	document.getElementById("tempImperial").addEventListener('click', changeTempLabelUnits); 

	
}

function changeTempLabelUnits(e)
{
	let tmpSpan = document.querySelector("#temp");
	tmpSpan.textContent = "";	
	if(e.target.id === "tempMetric")
		document.querySelector("#tempLabel").textContent = "Temperature (C): ";
	else
		document.querySelector("#tempLabel").textContent = "Temperature (F): ";
}

function populateView(resp)
{
	//brittle hack
	if(resp.coord != "undefined")
	{
		document.querySelector("#description").textContent = resp.weather[0].description.toUpperCase();
		document.querySelector("#temp").textContent = resp.main.temp;
		document.querySelector("#humidity").textContent = resp.main.humidity;
	}
}

//takes a MouseEvent created by a from element and calls
function callWeatherApi(e)
{
	let locationQueryParm = null;
	let wf = document.querySelector("#weatherForm");
	let units = document.querySelector('input[name="tempUnits"]:checked').value;	
  let unitsParm = "&units="+encodeURIComponent(units); 

	if(e.target.id === "callWeatherApiZip")
	{
		let zip = wf.zip_field.value;	
		locationQueryParm = "?zip="+encodeURIComponent(zip);
	}
	else if (e.target.id === "callWeatherApiCity")
	{
		let city = wf.city_field.value;	
		locationQueryParm = "?q="+encodeURIComponent(city);
	}

	let url = OWM_ENDPT + locationQueryParm + unitsParm + "&appid=" + encodeURIComponent(OWM_API_KEY);
	
  let req = new XMLHttpRequest();
  req.addEventListener("error", (err) => {alert(err);} );
	req.addEventListener('load', (evt) => {
      if(req.status >= 200 && req.status < 400)
			{
        var response = JSON.parse(req.responseText);
				populateView(response);
			}
			else
				console.log("error: " + req.statusText);
	}); 
  req.open("GET", url, true);
	req.send();
	e.preventDefault();
}

function callHttpBinApi(e)
{
  console.log(obj);
}

init();

