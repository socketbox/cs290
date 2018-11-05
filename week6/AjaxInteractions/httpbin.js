/*
 * author: Casey Boettcher
 * OID: boettchc
 * date: 2081-10-29
 * filename: httpbin.js
 * activity: Ajax Interactions
 */

const HTTPBIN_ENDPT = "https://httpbin.org/post"

//named mindful of the possibility for namespace collision ...
function init2()
{
  //bind event listeners to DOM
  document.getElementById("httpBinForm").addEventListener('submit', callHttpBinPost); 
  
  document.querySelector("#userText").setAttribute("placeholder",
    "CHRONOLOGY OF ORGANIZATION OF NORTH AMERICAN NATIONS' REVENUE-ENHANCING SUBSIDIZED TIME™, BY YEAR\n"+
    "(1) Year of the Whopper\n" + "(2) Year of the Tucks Medicated Pad\n" + "(3) Year of the Trial-Size Dove Bar\n" +
    "(4) Year of the Perdue Wonderchicken\n" + "(5) Year of the Whisper-Quiet Maytag Dishmaster\n" +  
    "(6) Year of the Yushityu 2007 Mimetic-Resolution-Cartridge-View-Motherboard-Easy-To-Install-Upgrade For " + 
    "Infernatron/InterLace TP Systems For Home, Office, Or Mobile (sic)\n" +
    "(7) Year of Dairy Products from the American Heartland\n" + "(8) Year of the Depend Adult Undergarment\n" +
    "(9) Year of Glad");
}

function callHttpBinPost(event) 
{
  let form = event.currentTarget;
  let req = new XMLHttpRequest();
  //get form data and encode to JSON
  let payload = {userText:""};
  payload.userText = form.userText.value;
  req.addEventListener('load', (evt)=>{
    if(req.status >= 200 && req.status < 400)
    {
      let respDivJson = document.querySelector("#httpBinApiResponseJson");
      let respDivText = document.querySelector("#httpBinApiResponseText");
      respDivJson.style.color = "blue";
      respDivText.style.color = "green";
      respDivJson.textContent = req.responseText;   
      let jsonString = JSON.parse(req.responseText).data;
			respDivText.textContent = JSON.parse(jsonString).userText;
    }
    else
      console.log(req.status);
  });
  req.open( "POST", HTTPBIN_ENDPT, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

init2();

