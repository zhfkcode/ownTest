// chrome.runtime.onMessage.addListener(function (request, sender, callback) {

// })
// 发送消息
// chrome.extension.sendMessage(string, message, function (response) {
//     console.log(response)
// })
// var button = document.getElementById("helloWorld");
//     button.addEventListener("click", function () {
//         alert("hello world");
//     }, false);
// $(document).on('click', "#helloWorld",function () {
//      $.ajax({
//          url: 'http://www.zhishuchacha.com/getdata.php',
//          type: 'POST',
//          data: {
//              type: "ssrq",
//              val: [4000]
//          },
//          success: function (res) {
//              console.log(res)
//          }
//      })
//     alert('content.script')
//     chrome.runtime.sendMessage({
//         greeting: "hello"
//     }, function (response) {
//        $('#infoShow').html(response)
//     });
// })
//  chrome.runtime.onMessage.addListener(
//      function (request, sender, sendResponse) {
//          alert(1111)
//          console.log(sender.tab ?
//              "from a content script:" + sender.tab.url :
//               "from the extension");
//          if (request.greeting == "cookie.value"){ //判断是否为要处理的消息
//             $('#helloWorld').css('color','green')
//               sendResponse({
//                  farewell: "goodbye"
//              });
//              }
//      });
var key = '/mc/live/ci/shop/monitor/listShop.json?cateId=16&dateRange=2019-01-05|2019-01-05&dateType=today&device=0&indexCode=uvIndex,tradeIndex,cateRankId&order=desc&orderBy=uvIndex&orderType=shop&sellerType=-1&type=all'
$(function(){
console.log(222)
$('#app').on('DOMNodeInserted', function (e) {
    console.log(e.target.className)
    // var dom = $(this).find('.ebase-FaCommonFilter__right')
    if (e.target.className == 'ebase-metaDecorator__root'){
        $('.ebase-FaCommonFilter__bottom .ebase-FaCommonFilter__right').prepend('<button>hello baby</button>')
        $('#app').off('DOMNodeInserted')
    }
    
   
//    $(this).on('DOMNodeInserted')
//    $(this).off()

})
var localData = JSON.parse(localStorage.getItem(key)).split("|")[1]
console.log(JSON.parse(localData).value._d.data)
})
