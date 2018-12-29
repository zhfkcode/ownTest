function getDomainFromUrl(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    // if (getDomainFromUrl(tab.url).toLowerCase() == "127.0.0.1") {
    chrome.pageAction.show(tabId);
    // }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
var waitValue = ''
chrome.cookies.get({
    url: "https://h5.m.taobao.com/",
    name: "_m_h5_tk"
},
function (cookie) {
waitValue = cookie.value
})
chrome.extension.onMessage.addListener(function (message, send, sendResponse) {
    console.log(message,waitValue);
    var setStr = "https://acs.m.taobao.com/h5/mtop.taobao.wsearch.h5search/1.0/" + getData(waitValue, '袜子', 1)
      var req = new XMLHttpRequest();
              req.open("GET", setStr, false);
              req.setRequestHeader('cookie', waitValue);
              req.onreadystatechange = function () {
                  if (req.readyState == 4) {
                      // 警告! 这里有可能执行了一段恶意脚本!
                      console.log(req, document.cookie)
                       sendResponse([1,2,3,4])
                  }
              }
              // req.onload = this.showPhotos_.bind(this);
              req.send(null);
     
        //  $.ajax({
        //      url: setStr,
        //      type: 'GET',
        //      async:false,
        //     //  headers: {
        //     //      'cookie': waitValue
        //     //  },
        //      beforeSend: function(xhr){
        //         xhr.setRequestHeader("cookie:" + waitValue)
        //      },
        //       complete: function (xhr, data) {
        //           console.log('toutou' + xhr.getAllResponseHeaders())
        //       },
        //      success: function (data) {
        //          console.log(data)
        //         sendResponse({
        //             aaa: "nimabi"
        //         })
        //      }
        //  })
    
    // chrome.cookies.get({
    //     url: "https://h5.m.taobao.com/",
    //     name: "_m_h5_tk"
    // }, function (cookie) {
    //     chrome.tabs.query({
    //             active: true,
    //             currentWindow: true
    //         },
    //         function (tabs) {
    //             chrome.tabs.sendMessage(
    //                 tabs[0].id, {
    //                     greeting: "cookie.value"
    //                 },
    //                 function (response) {
    //                     console.log(response.farewell);
    //                 });
    //         });
    //    sendResponse({
    //        farewell: "nihao"
    //    })
    //     var setStr = "https://acs.m.taobao.com/h5/mtop.taobao.wsearch.h5search/1.0/" + getData(cookie.value, '袜子', 1)
    //     $.ajax({
    //         url: setStr,
    //         type: 'GET',
    //         async:false,
    //         success: function (data) {
    //         }
    //     })
    // })
});
function getData(hcookie, keywords, page) {
    var htoken = hcookie.split('_')[0]
    var nowDate = new Date()
    var ht = nowDate.getTime()
    var hData = setData(keywords, page)
    var hsin = hex_md5(htoken + "&" + ht + "&" + "12574478&" + hData)
    console.log(htoken, ht, hData, hsin)
    var fanllyStr = "?jsv=2.3.16&appKey=12574478&t=" + ht + "&sign=" + hsin + "&api=mtop.taobao.wsearch.h5search&v=1.0&H5Request=true&ecode=1&type=jsonp&dataType=jsonp&callback=mtopjsonp" + page + "&data=" + hData
    return fanllyStr
}

function setData(keywords, page) {
    var jsonString = {
        "event_submit_do_new_search_auction": "1",
        "_input_charset": "utf-8",
        "topSearch": "1",
        "atype": "b",
        "searchfrom": "1",
        "action": "home:redirect_app_action",
        "from": "1",
        "q": keywords,
        "sst": "1",
        "n": 20,
        "buying": "buyitnow",
        "m": "api4h5",
        "token4h5": "",
        "abtest": "9",
        "wlsort": "9",
        "style": "list",
        "closeModues": "nav,selecthot,onesearch",
        "page": page
    }
    return encodeURIComponent(JSON.stringify(jsonString))
}
// chrome.extension.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         var req = new XMLHttpRequest();
//         req.open("GET", "https://h5.m.taobao.com/", true);
//         req.onreadystatechange = function () {
//             if (req.readyState == 4) {
//                 // 警告! 这里有可能执行了一段恶意脚本!
//                 console.log(req, document.cookie)
//                 //  sendResponse('aaa')
//             }
//         }
//         // req.onload = this.showPhotos_.bind(this);
//         req.send(null);
//         // req.onloadstart = function () {

//         // }
//         if (request.greeting == "hello")
//             sendResponse({
//                 farewell: "goodbye"
//             });
//         else
//             sendResponse({}); // snub them.
//     });
//  var req = new XMLHttpRequest();
//  req.open("GET", "https://h5.m.taobao.com/", true);
//  req.onreadystatechange = function () {
//      if (req.readyState == 4) {
//          // 警告! 这里有可能执行了一段恶意脚本!
//          console.log(req,document.cookie)
//         //  sendResponse('aaa')
//      }
//  }
//  // req.onload = this.showPhotos_.bind(this);
//  req.send(null);
//  req.onloadstart=function(){

//  }