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
$(document).on('click', "#helloWorld",function () {
    alert('content.script')
    chrome.runtime.sendMessage({
        greeting: "hello"
    }, function (response) {
       $('#infoShow').html(response)
    });
})
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