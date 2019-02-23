var inputElementId = 'vin';
var copyOption = 'copy';

var requestURL = 'https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real';
var requestMethod = 'GET';

var errorMsg = 'Error: No VIN found.';

var readyState = 4;
var httpStatus = 200;
var popupCloseTimeInMs = 1000;

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == readyState && this.status == httpStatus) {
        var result = JSON.parse(this.responseText);
        setWindowCopyVin(result);
    }
};

function getVIN() {
    xhttp.open(requestMethod, requestURL, true);
    xhttp.send();
}

function setWindowCopyVin(result) {
    var vin = (result && result.vin) || errorMsg;
    setVINOnWindow(vin, inputElementId);
    copyTextFromElementById(inputElementId);
    setTimeoutOfWindowClose(popupCloseTimeInMs);
}

function setVINOnWindow(vin, id) {
    var currentDiv = document.getElementById(id);
    currentDiv.value = vin;
}

function copyTextFromElementById(id) {
    var currentDiv = document.getElementById(id);
    currentDiv.focus();
    currentDiv.select();
    document.execCommand(copyOption);

}

function setTimeoutOfWindowClose(time) {
    setTimeout(function () {
        window.close();
    }, time);
}

getVIN();