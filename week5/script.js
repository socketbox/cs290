const CS290_COL_NUM=4
const CS290_ROW_NUM=4
const CS290_BUTTON_NUM=5

//track the cursor position
window.cursorCell = 11;

/*
 * Elements to be added
 */
let styleElement = { "tag":"style" };
let tableElement = { "tag":"table" };
let tableHeadRow = { "tag":"tr" };
let tableRow = { "tag":"tr" };
let tableColHead = { "tag":"th" };
let tableCell = { "tag":"td", "atts": {"class":"default"}};
let button = { "tag":"input", "atts": {"type":"button", "value":""} };
let buttonDiv = { "tag":"div", "atts": {"id":"buttonDiv"}};

let body = document.getElementsByTagName('body')[0];

/*
 *  in: a parent node, beneath which the element should be created
 *  in: ojbect with element name and KV pairs for attributes and values
 */
function createElementUnderParent( p, tagWithAtts )
{
  let e = document.createElement( tagWithAtts.tag );
  if(tagWithAtts.atts) 
  {
    Object.keys(tagWithAtts.atts).forEach( function(a){
      e.setAttribute(a, tagWithAtts.atts[a]);
    });
  }
  p.appendChild(e);
  return e;
}

/*
 * in: event object produced by button click
 */
function cursorButtonClickHandler(e)
{
  let td = document.getElementById(cursorCell);
  moveCursor(e, td);
}

function moveCursor(e, td)
{
  let d = e.srcElement.id;
  td.classList.remove("cursor"); 
  if(d === 'up')
  {
    if(cursorCell > 14)
      cursorCell -= 10;
  }
  if(d === 'down')
  {
    if(cursorCell < 31)
      cursorCell += 10;
  }
  if(d === 'left')
  {
    if(cursorCell % 10 > 1)
      cursorCell -= 1;
  }
  if(d === 'right')
  {
    if(cursorCell % 10 < 4)
      cursorCell += 1;
  }
  td =  document.getElementById(cursorCell);
  td.classList.add("cursor");
}

function markCell(e)
{
  document.getElementById(cursorCell).classList.add("marked");
}

function initStyles()
{
  let style = createElementUnderParent(document.head, styleElement);
  style.textContent = 
   `.default {background-color: inherit; text-align: center;}
    .cursor {border: 1px solid black; }
    .marked {background-color: yellow;}`;
  document.getElementById(cursorCell).classList.add("cursor");
}

function layoutTable()
{
  let table = createElementUnderParent(body, tableElement);
  let headRow = createElementUnderParent(table, tableHeadRow);
  let tmpElem = null; 
  for(let i = 1; i <= CS290_COL_NUM; i++)
  {
    tmpElem = createElementUnderParent(headRow, tableColHead);
    tmpElem.textContent = "Header " + i; 
  }
  let td = null;
  for(let j = 1; j <= CS290_ROW_NUM -1; j++)
  {
    tmpElem = createElementUnderParent(table, tableRow); 
    for(let k = 1; k <= CS290_COL_NUM; k++)
    {
      td = createElementUnderParent(tmpElem, tableCell);
      td.textContent = j + ", " + k;
      td.setAttribute("id", String(j) + String(k)); 
    }
  }
}

function createButtons()
{
  //add a container div for all buttons
  let bd = createElementUnderParent(body, buttonDiv);  
  let tmpElem = null; 
  let tmpVal = ""; 
  for(let i = 0; i < 5; i++)
  {
    tmpElem = createElementUnderParent(bd, button);
    /*the "Mark Cell" button is the last in the loop; anything before that is a cursor button 
      that should have the relevant event handler */
    if(i<4)
      tmpElem.addEventListener('click', cursorButtonClickHandler); 
    switch(i)
    {
      case 0:
        tmpElem.setAttribute("value","Up");
        tmpElem.setAttribute("id","up");
        break;
      case 1:
        tmpElem.setAttribute("value","Down");
        tmpElem.setAttribute("id","down");
        break;
      case 2:
        tmpElem.setAttribute("value","Left");
        tmpElem.setAttribute("id","left");
        break;
      case 3:
        tmpElem.setAttribute("value","Right");
        tmpElem.setAttribute("id","right");
        break;
      case 4:
        tmpElem.setAttribute("value","Mark Cell");
        tmpElem.setAttribute("id","marker");
        tmpElem.addEventListener('click', markCell);
        break;
    }
  }
}

layoutTable();
createButtons();
initStyles();


