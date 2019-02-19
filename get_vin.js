var xhr = new XMLHttpRequest();

xhr.open("GET", "https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real", false);
xhr.send();

var result = JSON.parse(xhr.responseText);

var newDiv = document.createElement("div");
var newContent = document.createTextNode(result.vin);
newDiv.appendChild(newContent);

var currentDiv = document.getElementById("divParent");
document.body.insertBefore(newDiv, currentDiv);
