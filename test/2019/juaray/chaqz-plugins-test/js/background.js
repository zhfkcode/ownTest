var requestNum=0;
var responseData = {
    payRate:[],
    tradeIndex:[],
    payByr:[],
    uvIndex:[],
    seIpv: [],
    cartHit: [],
    cltHit:[]
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        responseData = {
            payRate: [],
            tradeIndex: [],
            payByr: [],
            uvIndex: [],
            seIpv: [],
            cartHit: [],
            cltHit: []
        }
            for (var key in request) {
                getAjax(request[key].value, request[key].type, sendResponse, Object.keys(request).length)
            }
        // if (request.greeting == "您好")
        //     sendResponse({
        //         farewell: "再见"
        //     });
        return true;
    });
function getAjax(data, type, sendResponse,num) {
    $.ajax({
        url: 'http://47.111.5.205:8090/api/v1/plugin/flowFormula?type=' + type,
        type: "POST",
        // async: false,
        contentType: "application/json,charset=utf-8",
        data: JSON.stringify({exponent: data}),
        success: function (data) {
            var filterType = type == 1 ? 'payRate' : type == 2 ? 'tradeIndex' : type ==3 ? 'payByr' : type == 4 ? 'uvIndex' : type == 5 ? 'seIpv' : type == 6 ? 'cartHit' : type == 7 ? 'cltHit' : ''
            responseData[filterType] = data.data
            requestNum++
            if (requestNum > num-1) {
                sendResponse(responseData)
                requestNum = 0
            }
            // console.log(data, requestNum)
        }
    })
}