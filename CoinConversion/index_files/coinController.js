
var getCoinRequestUri = "https://min-api.cryptocompare.com/data/price?fsym={fromSymbol}&tsyms={toSymbol}&e={converterSymbol}"
var toSymbol = "USD";
var ajaxreqCount=0;
function getPoloniexExchageRate(fromSymbol) {
    var converterSymbol = "Poloniex"
    var requestUri = getCoinRequestUri.replace("{toSymbol}", toSymbol).replace("{fromSymbol}", fromSymbol).replace("{converterSymbol}", converterSymbol);

    $.get(requestUri, function (data, status) {
        console.log("response Data:" + JSON.stringify(data) + ",Status:" + status)
        showResult("poloniexRateDiv", data);
    });


}

function findExchageRates(fromSymbol) {
    try {
        showLoadingDiv();
        getPoloniexExchageRate(fromSymbol)
        getBittrexExchageRate(fromSymbol);
        getKrakenExchageRate(fromSymbol);
        getBitfinexExchageRate(fromSymbol);
        getCryptopiaExchageRate(fromSymbol);
    } finally{
        hideLoadingDiv();
    }


}

function getBittrexExchageRate(fromSymbol) {
    var converterSymbol = "Bittrex"
    var requestUri = getCoinRequestUri.replace("{toSymbol}", toSymbol).replace("{fromSymbol}", fromSymbol).replace("{converterSymbol}", converterSymbol);
    
    $.get(requestUri, function (data, status) {
        console.log("response Data:" + JSON.stringify(data) + ",Status:" + status)
        showResult("bittrexRateDiv", data);
    });
}
function getKrakenExchageRate(fromSymbol) {
    var converterSymbol = "Kraken"
    var requestUri = getCoinRequestUri.replace("{toSymbol}", toSymbol).replace("{fromSymbol}", fromSymbol).replace("{converterSymbol}", converterSymbol);

    $.get(requestUri, function (data, status) {
        console.log("response Data:" + JSON.stringify(data) + ",Status:" + status)
        showResult("krakenRateDiv", data);
    });
}
function getBitfinexExchageRate(fromSymbol) {
    var converterSymbol = "Bitfinex"
    var requestUri = getCoinRequestUri.replace("{toSymbol}", toSymbol).replace("{fromSymbol}", fromSymbol).replace("{converterSymbol}", converterSymbol);

    $.get(requestUri, function (data, status) {
        console.log("response Data:" + JSON.stringify(data) + ",Status:" + status)
        showResult("bitfinexRateDiv", data);
    });
}

function getCryptopiaExchageRate(fromSymbol) {
    var converterSymbol = "Cryptopia"
    var requestUri = getCoinRequestUri.replace("{toSymbol}", toSymbol).replace("{fromSymbol}", fromSymbol).replace("{converterSymbol}", converterSymbol);

    $.get(requestUri, function (data, status) {
        console.log("response Data:" + JSON.stringify(data) + ",Status:" + status);
        showResult("cryptopiaRateDiv", data);
    });
}
function showResult(compnentId, data) {
    var content = "";
    if (data.hasOwnProperty('USD')) {
        var rate = data.USD;
        rate = rate.toFixed(6);
        content = "Rate:" + rate;

    }
    else {
        content = "Doller rate not avilable.";
    }
    changeDivContent(compnentId, content)
}
function changeDivContent(divId, content) {
    $("#" + divId).html(content);
}
function showLoadingDiv() {
    ajaxreqCount++;
    if(ajaxreqCount==1){
         var lDiv = $('#LoadingDiv');
    var leftPos = ($(document).width() - lDiv.width()) / 2;
    lDiv.css('left', leftPos + 'px')
        .show();
    }
   
}

function hideLoadingDiv() {
    ajaxreqCount--;
    if(ajaxreqCount==0){
         $('#LoadingDiv').hide();
    }
   
}

$(document).ajaxStart(function () {
    showLoadingDiv();
});
$(document).ajaxStop(function () {
    hideLoadingDiv();
});

$(function () {
    $("#coinSelect").on('change', function () {

        var selectedSymbol = $('#coinSelect option:selected').val();
       // alert(selectedSymbol);
        findExchageRates(selectedSymbol)

    });
});

$(document).ready(function() {
     $("#coinSelect").change();
  });

