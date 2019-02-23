var inputElementId = 'vin';
var copyOption = 'copy';

var requestURL = 'https://www.randomvinbarcode.com/.netlify/functions/randomVin?type=real';
var requestMethod = 'GET';

var errorMsg = 'Error: No VIN found.';

var readyState = 4;
var httpStatus = 200;
var popupCloseTimeInMs = 1000;

var xhttp = new XMLHttpRequest();
xhttp.request = function (requestVerb, url, async) {
    this.open(requestVerb, url, async);
    return this;
};
xhttp.configureResponse = function (responseHandler) {
    xhttp.onreadystatechange = responseHandler;
    return this;
};

function getVIN(responseHandler) {
    xhttp.request(requestMethod, requestURL, true)
        .configureResponse(responseHandler)
        .send();
}

function setWindowCopyVin(result) {
    var vin = (result && result.vin) || errorMsg;
    setVINOnWindow(vin, inputElementId);
    copyTextFromElementById(inputElementId);
    setTimeoutWindowClose(popupCloseTimeInMs);
}

function setVINOnWindow(vin, id) {
    var currentDiv = null;
    if (!!document) {
        currentDiv = document.getElementById(id);
    }
    if (!!currentDiv) {
        currentDiv.value = vin;
    }
}

function copyTextFromElementById(id) {
    var currentDiv = document.getElementById(id);
    currentDiv.focus();
    currentDiv.select();
    document.execCommand(copyOption);

}

function setTimeoutWindowClose(time) {
    setTimeout(function () {
        window.close();
    }, time);
}

var getVinResponseHandler = function() {
    if (this.readyState == readyState && this.status == httpStatus) {
        var result = JSON.parse(this.responseText);
        setWindowCopyVin(result);
    }
};

getVIN(getVinResponseHandler);