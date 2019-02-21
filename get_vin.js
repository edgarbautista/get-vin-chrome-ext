var inputElementId = "vin";
var requestURL = "https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real";
var requestMethod = "GET";

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        setWindowCopyVin(result);
    }
};

function getVIN() {
    xhttp.open(requestMethod, requestURL, true);
    xhttp.send();
}

function setWindowCopyVin(result) {
    var vin = (result && result.vin) || 'Error: No VIN found.';
    setVINOnWindow(vin, inputElementId);
    copyTextFromElementById(inputElementId);
    setTimeoutOfWindowClose(1000);
}

function setVINOnWindow(vin, id) {
    var currentDiv = document.getElementById(id);
    currentDiv.value = vin;
}

function copyTextFromElementById(id) {
    var currentDiv = document.getElementById(id);
    currentDiv.focus();
    currentDiv.select();
    document.execCommand("copy");

}

function setTimeoutOfWindowClose(time) {
    setTimeout(function () {
        window.close();
    }, time);
}

getVIN();