var inputElementId = "vin";

var xhr = new XMLHttpRequest();

xhr.open("GET", "https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real", false);
xhr.send();

var result = JSON.parse(xhr.responseText);

var currentDiv = document.getElementById(inputElementId);
currentDiv.value = result.vin;
currentDiv.focus();
currentDiv.select();

document.execCommand("copy");


setTimeout(function () {
    window.close();
}, 1000);