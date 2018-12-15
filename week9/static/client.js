
function changeHandler()
{
  let idStr = event.srcElement.id;
  let idNumb = idStr.split('-')[1];
  let saveBttn = document.getElementById('saveBttn-'+idNumb);
  saveBttn.removeAttribute('disabled');  
}

/*
 * taken from https://stackoverflow.com/a/35385518/148680 
 */
function htmlToElements(html) 
{
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}

function appendNewRow()
{
  console.log("in appendNewRow");
  let tBody = document.getElementsByTagName("tbody")[0];
  let newRow = htmlToElements(this.response); 
  tBody.appendChild(newRow[0]);
  document.getElementById("form-0").reset();
}

function createRow()
{
  //get the form associated with the Save button
  let idNumb = event.srcElement.id.split('-')[1]; 
  let rowForm = document.getElementById('form-'+idNumb);
  //https://stackoverflow.com/a/48267035/148680
  if(rowForm.reportValidity())
  {
    var req = new XMLHttpRequest();
    //the form id will determine whether we are creating or updating
    let payload = [];
    const formColl = rowForm.elements;
    //kludge to accomodate saving edited rows as well 
    for(let i = 0; i< formColl.length; i++)
    {
      if(formColl[i].type == "radio" && formColl[i].checked == true)
      {
        //we only need five values and the last is determined by the units radio buttons
        if(formColl[i].value == "lbs")
          payload[4] = "1";
        else
          payload[4] = "0";
      }
      else if(formColl[i].type == 'text' || formColl[i].type == 'date')
        payload[i] = formColl[i].value;
    }
    let hn = window.location.host; 
    let url = "http://" + hn + "/insert";
    req.open('POST', url, true); 
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.addEventListener('load', appendNewRow);
    req.send(JSON.stringify(payload));
    event.preventDefault(); 
  
  }
}

function saveRow()
{
  //get the form associated with the Save button
  let idNumb = event.srcElement.id.split('-')[1]; 
  let rowForm = document.getElementById('form-'+idNumb);
  //https://stackoverflow.com/a/48267035/148680
  if(rowForm.reportValidity())
  {
    var req = new XMLHttpRequest();
    //the form id will determine whether we are creating or updating
    let payload = [];
    const formColl = rowForm.elements;
    //jimmying the index as a kludge to accomodate saving edited rows as well 
    for(let i = 4; i< formColl.length; i++)
    {
      if(formColl[i].type == 'text' && formColl[i].name != 'date')
        payload[i-4] = formColl[i].value;
      else if(formColl[i].name == 'date')
        payload[3] = formColl[i].value;
    }
    let hn = window.location.host; 
    let url = "http://" + hn + "/update";
    //append row id onto the array 
    payload.push(idNumb);
    req.open('POST', url, true); 
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.addEventListener('load', saveEditedRow);
    req.send(JSON.stringify(payload));
    event.preventDefault(); 
  }
}

function editRow()
{
    let editBttn = event.srcElement;
    //let hiddenId = editBttn.previousElementSibling.previousElementSibling.value;
    let siblings = editBttn.parentNode.children;
    for(let i = 0; i < siblings.length; i++)
    {
      if(siblings[i].value == 'Delete')
        siblings[i].setAttribute('disabled','');
      else if(siblings[i].tagName.toLowerCase() == 'input' && siblings[i].hasAttribute('readonly'))
      {
        siblings[i].removeAttribute('readonly');
        siblings[i].setAttribute('oninput','changeHandler()');
      }
      else if(siblings[i].value == 'Save')
      {
        siblings[i].removeAttribute('hidden');
        //this next changes when the input triggers a change event
        siblings[i].setAttribute('disabled','');
      }

    }
    editBttn.setAttribute('hidden', '');
    /*let idStr = "row"+hiddenId;
    let formRow = document.querySelector(`tr#${idStr}`);
    var req = new XMLHttpRequest();
    var payload = {rowId: hiddenId};
    let hn = window.location.host; 
    let url = "http://" + hn + "/delete"; 
    req.open('POST', url, true); 
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.addEventListener('load', removeRowFromDom);
    req.send(JSON.stringify(payload));*/
    event.preventDefault();
}

function saveEditedRow()
{
  let jObj = JSON.parse(this.response);
  let idNumb = jObj.reqBody[4];
  let children = document.getElementById('form-'+idNumb).children;
  for(let i = 0; i < children.length; i++)
  {
    if(children[i].id == 'saveBttn-'+idNumb)
      children[i].setAttribute('hidden','');
    if(children[i].id == 'editBttn-'+idNumb)
      children[i].removeAttribute('hidden','');
    if(children[i].id == 'deleteBttn-'+idNumb)
      children[i].removeAttribute('disabled');
    if(children[i].id == 'exerciseName-'+idNumb)
    {
      children[i].value = jObj.reqBody[0];
      children[i].setAttribute('readonly','');
    }
    if(children[i].id == 'reps-'+idNumb)
    {
      children[i].value = jObj.reqBody[1];
      children[i].setAttribute('readonly','');
    }
    if(children[i].id == 'weight-'+idNumb)
    {
      children[i].value = jObj.reqBody[2];
      children[i].setAttribute('readonly','');
    }
    if(children[i].id == 'date-'+idNumb)
    {
      children[i].value = jObj.reqBody[3];
      children[i].setAttribute('readonly','');
    }
  }
}

function deleteRow()
{
    let hiddenId = event.srcElement.previousElementSibling.value;
    let idStr = "row-"+hiddenId;
    let formRow = document.querySelector(`tr#${idStr}`);
    var req = new XMLHttpRequest();
    var payload = {rowId: hiddenId};
    let hn = window.location.host; 
    let url = "http://" + hn + "/delete"; 
    req.open('POST', url, true); 
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    req.addEventListener('load', removeRowFromDom);
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

function removeRowFromDom(event)
{
    if(event.currentTarget.status >= 200 && event.currentTarget.status < 400)
    {
      let jso = JSON.parse(this.responseText);
      let tr = document.getElementById(jso.rowId); 
      tr.parentElement.removeChild(tr);
    } else {
      console.log("Error in network request: " + req.statusText);
    }
}

function clearTable()
{
  var req = new XMLHttpRequest();
  let hn = window.location.host; 
  let url = "http://" + hn + "/reset"; 
  req.open('POST', url, true); 
  req.setRequestHeader('Content-Type', 'application/json');
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  req.addEventListener('load', function(){
    let tBody = document.getElementsByTagName("tbody")[0];
    while(tBody.firstChild)
    {
      tBody.removeChild(tBody.firstChild);
    }
  });
  req.send();
  event.preventDefault(); 
}

