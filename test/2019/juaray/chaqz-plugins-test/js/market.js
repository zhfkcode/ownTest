$(function(){
    layui.config({
        dir: '/js/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
            ,
        version: false //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
            ,
        debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
            ,
        base: '' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
    });
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer,
            form = layui.form;

        layer.msg('Hello World');
    });
    $('#app').on('DOMNodeInserted', function (e) {
        console.log(e.target.id + ',', e.target.className)
        if (e.target.className == 'industry-tab-index') {
            $('.mc-marketMonitor .oui-card-header-wrapper .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
            // $('#app').off('DOMNodeInserted')
        }
        if (e.target.className == 'tree-menu common-menu tree-scroll-menu-level-2') {
             $('.op-mc-market-monitor-industryCard .oui-card-header-item-pull-right').prepend('<div class="chaqz-btns btns-right"><button class="serachBtn">一键转化</button></div>')
        }
        if (e.target.className == 'oui-index-picker-group') {
            if($('.op-mc-market-rank-container .oui-card-header .chaqz-btns').length>0){
                return false
            }
             $('.op-mc-market-rank-container .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
        }
    })
     $(document).on('click', '.mc-marketMonitor .serachBtn', function () {//市场监控店铺
         var isCurrent = $('.ebase-FaCommonFilter__right .oui-date-picker-particle-button button.ant-btn-primary').index()==0?true:false;
         var key = getLocalKey(isCurrent)
         if (JSON.parse(localStorage.getItem(key))) {
             var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
             var middleData = JSON.parse(localData).value._d.data;
             var finaData = isCurrent ? middleData.data:middleData;
             filterdata(finaData)
             chrome.runtime.sendMessage(indexTypes, function (res) {
                var length = res.payRate.length
                var trTotal = '<tr><td>店铺信息</td><td>行业排名</td><td>交易金额</td><td>访客人数</td><td>搜索人数</td><td>收藏人数</td><td>加购人数</td><td>支付转化率</td><td>支付人数</td><td>客单价</td><td>UV价值</td><td>搜索占比</td><td>收藏率</td><td>加购率</td></tr>'
                for (var i = 0; i < length; i++) {
                    var computedNum = computedPayByr(res.uvIndex[i], res.payRate[i], res.tradeIndex[i])
                    var td = "<td><div class='info'><img src = '" + finaData[i].shop.pictureUrl + "'><span>" + finaData[i].shop.title + "</span></div></td>"
                    td += "<td>" + (finaData[i].cateRankId ? finaData[i].cateRankId.value : '-') + "</td>"
                    td += "<td>" + res.tradeIndex[i] + "</td>"
                    td += "<td>" + res.uvIndex[i] + "</td>"
                    td += "<td>" + res.seIpv[i] + "</td>"
                    td += "<td>" + res.cltHit[i] + "</td>"
                    td += "<td>" + res.cartHit[i] + "</td>"
                    td += "<td>" + res.payRate[i] + "</td>"
                    td += "<td>" + computedNum.res1 + "</td > "
                    td += "<td>" + computedNum.res2 + "</td > "
                    td += "<td>" + formula(res.tradeIndex[i], res.uvIndex[i], 1) + "</td > "
                    td += "<td>" + formula(res.seIpv[i], res.uvIndex[i], 2) + "</td > "
                    td += "<td>" + formula(res.cltHit[i], res.uvIndex[i], 2) + "</td > "
                    td += "<td>" + formula(res.cartHit[i], res.uvIndex[i], 2) + "</td > "
                    trTotal += "<tr>" + td + "</tr>"
                }
                domStruct(trTotal,'监控店铺')
             })
         }
     })
     $(document).on('click', '.op-mc-market-monitor-industryCard .oui-card-header-item-pull-right .serachBtn',function(){//热门店铺、商品
         var isCurrent = $('.ebase-FaCommonFilter__right .oui-date-picker-particle-button button.ant-btn-primary').index() == 0 ? true : false;
         var hotType = $('.op-mc-market-monitor-industryCard .oui-card-header-item .oui-tab-switch-item-active').index()
         var hotTypeUrl = '';
         if(hotType == 0){
            hotTypeUrl = 'showTopShops'
         } else if (hotType == 1){
            hotTypeUrl = 'showTopItems'
         }else{
             return false
         }
         var key = getJobLocalKey(isCurrent, hotTypeUrl)
         if (JSON.parse(localStorage.getItem(key))) {
             var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
             var middleData = JSON.parse(localData).value._d.data;
             var finaData = isCurrent ? middleData.data : middleData;
             var indexJob=filterJobdata(finaData)
             chrome.runtime.sendMessage(indexJob, function (res) {
                 // $('#app').append("<div class='chaqz-wrapper'><div class='content'><table></table></div></div> ")
                 var itemLength = res.tradeIndex.length
                 var trTotal = ''
                 var trTotal1 = '<tr><td>商品信息</td><td>排名</td><td>交易金额</td></tr>'
                 var trTotal2 = '<tr><td>店铺信息</td><td>排名</td><td>交易金额</td></tr>'
                 for (var i = 0; i < itemLength; i++) {
                     if (hotType==0 ){
                     var td = "<td><div class='info'><img src = '" + finaData[i].shop.pictureUrl + "'><span>" + finaData[i].shop.title + "</span></div></td>"
                     td += "<td>" + (finaData[i].cateRankId ? finaData[i].cateRankId.value : '-') + "</td>"
                     td += "<td>" + res.tradeIndex[i] + "</td>"
                     }else{
                         var td = "<td><div class='info'><img src = '" + finaData[i].item.pictUrl + "'><span>" + finaData[i].item.title + "</span></div></td>"
                         td += "<td>" + (finaData[i].cateRankId ? finaData[i].cateRankId.value : '-') + "</td>"
                         td += "<td>" + res.tradeIndex[i] + "</td>"
                     }
                     trTotal += "<tr>" + td + "</tr>"
                 }
                 if (hotType == 0){
                    trTotal1+=trTotal;
                    domStruct(trTotal1,'热门店铺','small')
                 }else{
                    trTotal2 += trTotal
                    domStruct(trTotal2, '热门商品', 'small')
                 }
             })
         }
     })
     $(document).on('click', '.op-mc-market-rank-container .oui-card-header .serachBtn', function () { //市场排行
        $.ajax({
            type:'GET',
            url: 'https://sycm.taobao.com/mc/mq/mkt/rank/shop/hotsale.json?dateRange=2019-01-14%7C2019-01-14&dateType=day&pageSize=10&page=1&order=desc&orderBy=tradeIndex&cateId=30&device=0&sellerType=-1&indexCode=cateRankId%2CtradeIndex%2CtradeGrowthRange%2CpayRateIndex&_=1547558838345&token=b5239f668',
            success:function(data){
                console.log(data)
            }
        })
     })
      $(document).on('click', '.chaqz-close', function () {
          $('.chaqz-wrapper .content').removeClass('small')
          $('.chaqz-wrapper').hide()
      })
      $(document).on('click', '.chaqz-export', function () {
          var tableTitle = $('.chaqz-wrapper .chaqz-table-title').html()
          var name = tableTitle ? tableTitle : '查权重输出表单'
          $('#chaqz-table').tableExport({
              type: 'excel',
              escape: 'false',
              fileName: name
          });
      })
        $(document).on('click', '.copyBtn', function () {
            var clipboard = new ClipboardJS('.copyBtn', {//复制
                target: function () {
                    return document.querySelector('#chaqz-table');
                }
            });
        })

})
 function getLocalKey(isCurrent) {
     var cpid = localStorage.getItem('tree_history_op-mc._cate_picker')
     if (cpid){
         var cateId = JSON.parse(cpid).split("|")[1] 
         var finalcateId = JSON.parse(cateId).value[0].realObj.cateId;
     }
    var keyFont = isCurrent ? '/mc/live/ci/shop/monitor/list.json?cateId=' + finalcateId : '/mc/ci/shop/monitor/list.json?cateId=' + finalcateId;
    var pageSize = $('.op-mc-market-monitor-marketMonitor .mc-marketMonitor .ant-select-selection-selected-value').html()
    var hasPage = $('.op-mc-market-monitor-marketMonitor .mc-marketMonitor .alife-dt-card-common-table-pagination-wrapper .ant-pagination-item-active').html()
    var page = hasPage?hasPage:1;
     var params = window.location.search.split('?')[1]
     params = decodeURIComponent(params)
     var starIndex = params.indexOf('dateRange')
     var sellIndex = params.indexOf('sellerType')
     var endIndex = getPageInfo()
     var middePara = params.slice(starIndex, sellIndex - 2)
    //  var sellType = params.slice(sellIndex, endIndex - 1)
     var completeKey = keyFont + '&' + middePara + endIndex.device + "&indexCode=cateRankId,tradeIndex,uvIndex&order=desc&orderBy=tradeIndex&page=" + page + "&pageSize=" + pageSize + "&sellerType=" + endIndex.sellType
     return completeKey
 }
 function getJobLocalKey(isCurrent,hotType) {
     var cpid = localStorage.getItem('tree_history_op-mc._cate_picker')
     if (cpid){
         var cateId = JSON.parse(cpid).split("|")[1] 
         var finalcateId = JSON.parse(cateId).value[0].realObj.cateId;
     }

    var keyFont = isCurrent ? '/mc/mq/monitor/cate/live/' + hotType + '.json?cateId=' + finalcateId : '/mc/mq/monitor/cate/offline/' + hotType + '.json?cateId=' + finalcateId;
    var pageSize = $('.op-mc-market-monitor-industryCard .alife-dt-card-common-table-page-size-wrapper .ant-select-selection-selected-value').html()
    var page = $('.op-mc-market-monitor-industryCard .alife-dt-card-common-table-pagination-wrapper .ant-pagination-item-active').attr('title')
     var params = window.location.search.split('?')[1]
     params = decodeURIComponent(params)
     var starIndex = params.indexOf('dateRange')
     var sellIndex = params.indexOf('sellerType')
     var endIndex = params.indexOf('spm')
     var middePara = params.slice(starIndex, sellIndex - 1)
     var sellType = params.slice(sellIndex, endIndex - 1)
     var completeKey = keyFont + '&' + middePara + "&indexCode=tradeIndex&order=desc&orderBy=tradeIndex&page=" + page + "&pageSize=" + pageSize + "&" + sellType
     return completeKey
 }
//  获取页面静态信息
function getPageInfo(){
    var endpointTyep = $('.ebase-FaCommonFilter__top .fa-common-filter-device-select .oui-select-container-value').html()//终端类型
    var shopType = $('.ebase-FaCommonFilter__top .sellerType-select .ant-select-selection-selected-value').attr('title')//店铺  天猫淘宝
    var device = endpointTyep == '所有终端' ? '0' : endpointTyep == 'PC端' ? '1' : endpointTyep == '无线端' ? '2' :''
    var sellType = shopType == '全部' ? '-1' : endpointTyep == '天猫' ? '1' : endpointTyep == '淘宝' ? '0' : ''
    return {
        device: device,
        sellType : sellType
    }
}
 function domStruct(tr, title,type) {
     var isSmall = type =='small';
     var hasWrap = $('.chaqz-wrapper').length
     var curTimeText = $('.ebase-FaCommonFilter__top .oui-date-picker-current-date').html()
     if (curTimeText) {
         var curTime = curTimeText.split(/<\/?.+?\/?>/g)[3]
     }
     if (!hasWrap) {
         var contentClass = isSmall ? 'content small' : 'content'
           var wrapper = '<div class="chaqz-wrapper"><div class="' + contentClass + '"><div class="head"><div class="btns"><button class="copyBtn">一键复制</button><button class= "chaqz-export">导出excel</button></div><div class="title"><span class="chaqz-table-title">' + title + '</span><span class="time">' + curTime + '</span></div></div><div class="table-box"><table id="chaqz-table"> <tbody class="tbody">' + tr + '</tbody></table></div><span class="chaqz-close">×</span></div></div>'
         $('#app').append(wrapper)
     } else {
         if(isSmall){
             $('.chaqz-wrapper .content').addClass('small')
         }
         $('.chaqz-wrapper .time').html(curTime)
         $('.chaqz-wrapper .title').html(title)
         $('.chaqz-wrapper #chaqz-table .tbody').html(tr)
         $('.chaqz-wrapper').fadeIn(100);
     }
 }
// 监控店铺过滤
function filterdata(data) {
    initSaveType()
    if (data) {
        data.forEach((item) => {
            // if (!item.payRateIndex) {
            //     return false
            // }
            var va1 = item.payRateIndex ? item.payRateIndex.value : 0;
            var va2 = item.tradeIndex ? item.tradeIndex.value : 0;
            var va3 = item.payByrCntIndex ? item.payByrCntIndex.value : 0;
            var va4 = item.uvIndex ? item.uvIndex.value : 0;
            var va5 = item.seIpvUvHits ? item.seIpvUvHits.value : 0;
            var va6 = item.cartHits ? item.cartHits.value : 0;
            var va7 = item.cltHits ? item.cltHits.value : 0;
            indexTypes.payRate.value.push(va1);
            indexTypes.tradeIndex.value.push(va2);
            indexTypes.payByr.value.push(va3);
            indexTypes.uvIndex.value.push(va4);
            indexTypes.seIpv.value.push(va5);
            indexTypes.cartHit.value.push(va6);
            indexTypes.cltHit.value.push(va7);
        });
    }
}
// 监控店铺过滤
function filterJobdata(data) {
    var obj= {
         tradeIndex: {
             type: 2,
             value: []
         }
    }
    if (data) {
        data.forEach((item) => {
           obj.tradeIndex.value.push(item.tradeIndex.value)
        });
        return obj
    }
}
  function formula(val, val2, type) {
      if (!val2 || val == "" || val == "undefined" || val == '-' || val2 == '-') {
          return '-'
      } else {
          val = (val + '').replace(',', '');
          val2 = (val2 + '').replace(',', '')
          if (type == 1) {
              return (Math.round((val / val2) * 100) / 100).toFixed(2)
          } else {
              return (Math.round((val / val2) * 10000) / 100).toFixed(2) + '%'
          }
      }
  }
  function initSaveType() {
      indexTypes = {
          payRate: {
              type: 1,
              value: []
          },
          tradeIndex: {
              type: 2,
              value: []
          },
          payByr: {
              type: 3,
              value: []
          },
          uvIndex: {
              type: 4,
              value: []
          },
          seIpv: {
              type: 5,
              value: []
          },
          cartHit: {
              type: 6,
              value: []
          },
          cltHit: {
              type: 7,
              value: []
          }
      }
  }
  //计算支付人数
  function computedPayByr(v1,v2,v3){
      var result={
          res1:0,
          res2:0,
      }
      if (!v1 || v1=='-'|| !v2 || v2=='-'){
          result.res1 = '-'
          result.res2 = '-'
      }else{
           v1 = (v1 + '').replace(',', '');
           v2 = (v2 + '').replace(',', '').slice(0,-1);
           v3 = (v3 + '').replace(',', '');
           var del = v1 * v2
          result.res1 = Math.round(del/100)
          result.res2 = Math.round((v3 / del) * 10000) / 100
      }
      return result
  }