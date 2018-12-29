var http = require("http"),
    url = require("url"),
    cheerio = require("cheerio"),
    superagent = require("superagent")
    // charset = require('superagent-charset');
    // charset(superagent);
    var catchFirstUrl = 'https://h5.m.taobao.com/'; //入口页面
    superagent.get(catchFirstUrl)
        .end(function (err, pres) {
            // console.log('fetch ' + pageUrl + ' successful');
            // res.write('fetch ' + catchFirstUrl + ' successful<br/>');
            // 常规的错误处理
            if (err) {
                console.log(err);
            }
            console.log(pres.header)
            // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(pres.text);
            var curPageUrls = $('.home-wrapper').html();
            // res.write('fetch ' + curPageUrls + ' successful<br/>');
            console.log(curPageUrls)
            // for (var i = 0; i < curPageUrls.length; i++) {
            //     var articleUrl = curPageUrls.eq(i).attr('href');
            //     urlsArray.push(articleUrl);
            //     // 相当于一个计数器
            //     ep.emit('BlogArticleHtml', articleUrl);
            // }
        })