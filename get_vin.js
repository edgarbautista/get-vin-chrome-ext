var inputElementId = "vin";
var requestURL = "https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real";
var requestMethod = "GET";

async function getVIN() {
    var xhr = new XMLHttpRequest();
    xhr.open(requestMethod, requestURL, false);
    xhr.send();
    var result = JSON.parse(xhr.responseText);
    setWindowCopyVin(result);
}

function setWindowCopyVin(result) {
    setVINOnWindow(result.vin, inputElementId);
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