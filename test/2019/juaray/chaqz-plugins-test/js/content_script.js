var indexTypes = {
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
var tableInstance = null;
$(function () {
    $('#app').on('DOMNodeInserted', function (e) {
        // console.log(e.target.id, ',', e.target.className)
        if (e.target.className == 'oui-index-picker') { //竞争-监控店铺
            $('.mc-shopMonitor .oui-card-header-wrapper .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
            // $('#app').off('DOMNodeInserted')
        }
        if (e.target.className == 'oui-index-picker-group') { //竞争-监控商品
            $('.mc-ItemMonitor .oui-card-header-wrapper .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
            // $('#app').off('DOMNodeInserted')
        }
        if (e.target.id == 'itemAnalysisTrend') { //竞争-分析竞品
            autoRefresh()
            $('.op-mc-item-analysis #itemAnalysisTrend .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
            // $('#app').off('DOMNodeInserted')
        }
        if (e.target.id == 'sycm-mc-flow-analysis') { //竞争-分析竞品-入口来源
            autoRefresh()
            $('.sycm-mc-flow-analysis .oui-card-header').append('<div class="chaqz-btns btnsItem1"><button class="serachBtn">一键转化</button></div>')
        }
    })
    $(document).on('click', '.mc-shopMonitor .serachBtn', function () { //竞争-监控店铺
        var isCurrent = $('.ebase-FaCommonFilter__right .oui-date-picker-particle-button button.ant-btn-primary').index() == 0 ? true : false;
        if (!isCurrent) {
            alert('暂时只支持实时数据转化！');
            return false;
        }
        var key = getLocalKey()
        if (JSON.parse(localStorage.getItem(key))) {
            var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
            var finaData = JSON.parse(localData).value._d.data;
            filterdata(finaData)
            chrome.runtime.sendMessage(indexTypes, function (res) {
                var resData = []
                var length = res.payRate.length
                for (var i = 0; i < length; i++) {
                    var obj = {shop:{}}
                    var cateRnkId = finaData[i].cate_cateRankId
                    obj.shop={
                        title: finaData[i].shop.title,
                        url: finaData[i].shop.pictureUrl
                    }
                    obj.cate_cateRankId = cateRnkId?cateRnkId.value:'-'
                    obj.tradeIndex = res.tradeIndex[i]
                    obj.uvIndex = res.uvIndex[i]
                    obj.seIpv = res.seIpv[i]
                    obj.cltHit = res.cltHit[i]
                    obj.cartHit = res.cartHit[i]
                    obj.payByr = res.payRate[i]
                    obj.payRate = integer(res.payByr[i])
                    obj.kdPrice = formula(res.tradeIndex[i], res.payByr[i], 1)
                    obj.uvPrice = formula(res.tradeIndex[i], res.uvIndex[i], 1)
                    obj.searRate = formula(res.seIpv[i], res.uvIndex[i], 2)
                    obj.scRate = formula(res.cltHit[i], res.uvIndex[i], 2)
                    obj.jgRate = formula(res.cartHit[i], res.uvIndex[i], 2)
                    resData.push(obj)
                }
                var cols = [{
                        data: 'shop',
                        title: '店铺信息',
                        class: 'info',
                        render: function (data, type, row, meta) {
                            return '<img src="' + data.url + '"><span>' + data.title + '</span>';
                        }
                    },
                    {
                        data: 'cate_cateRankId',
                        title: '行业排名',
                    },
                    {
                        data: 'tradeIndex',
                        title: '交易金额',
                    },
                    {
                        data: 'uvIndex',
                        title: '访客人数',
                    },
                    {
                        data: 'seIpv',
                        title: '搜索人数',
                    },
                    {
                        data: 'cltHit',
                        title: '收藏人数',
                    }, {
                        data: 'cartHit',
                        title: '加购人数',
                    }, {
                        data: 'payRate',
                        title: '支付转化率',
                    }, {
                        data: 'payByr',
                        title: '支付人数',
                    }, {
                        data: 'kdPrice',
                        title: '客单价',
                    }, {
                        data: 'uvPrice',
                        title: 'UV价值',
                    }, {
                        data: 'searRate',
                        title: '搜索占比',
                    }, {
                        data: 'scRate',
                        title: '收藏率',
                    }, {
                        data: 'jgRate',
                        title: '加购率',
                    }
                ]
                domStruct({data:resData,cols:cols}, '监控店铺')
                // var length = res.payRate.length
                // var page = $(".mc-shopMonitor .ant-table-pagination .ant-pagination-item-active").attr('title')
                // var loadDataLength = {
                //     start: 0,
                //     end: 0
                // };
                // if (!page) {
                //     loadDataLength.end = length
                // } else {
                //     loadDataLength.start = (page - 1) * 10
                //     loadDataLength.end = (page * 10) < length ? (page * 10) : length;
                // }
                // var trTotal = '<tr><td>店铺信息</td><td>行业排名</td><td>交易金额</td><td>访客人数</td><td>搜索人数</td><td>收藏人数</td><td>加购人数</td><td>支付转化率</td><td>支付人数</td><td>客单价</td><td>UV价值</td><td>搜索占比</td><td>收藏率</td><td>加购率</td></tr>'
                // for (var i = loadDataLength.start; i < loadDataLength.end; i++) {
                //     var td = "<td><div class='info'><img src = '" + finaData[i].shop.pictureUrl + "'><span>" + finaData[i].shop.title + "</span></div></td>"
                //     td += "<td>" + (finaData[i].cate_cateRankId ? finaData[i].cate_cateRankId.value : '-') + "</td>"
                //     td += "<td>" + res.tradeIndex[i] + "</td>"
                //     td += "<td>" + res.uvIndex[i] + "</td>"
                //     td += "<td>" + res.seIpv[i] + "</td>"
                //     td += "<td>" + res.cltHit[i] + "</td>"
                //     td += "<td>" + res.cartHit[i] + "</td>"
                //     td += "<td>" + res.payRate[i] + "</td>"
                //     td += "<td>" + integer(res.payByr[i]) + "</td > "
                //     td += "<td>" + formula(res.tradeIndex[i], res.payByr[i], 1) + "</td > "
                //     td += "<td>" + formula(res.tradeIndex[i], res.uvIndex[i], 1) + "</td > "
                //     td += "<td>" + formula(res.seIpv[i], res.uvIndex[i], 2) + "</td > "
                //     td += "<td>" + formula(res.cltHit[i], res.uvIndex[i], 2) + "</td > "
                //     td += "<td>" + formula(res.cartHit[i], res.uvIndex[i], 2) + "</td > "
                //     trTotal += "<tr>" + td + "</tr>"
                // }
                // domStruct(trTotal, '监控店铺')
            })
        } else {
            alert("请刷新重试")
        }
    })
    $(document).on('click', '.mc-ItemMonitor .serachBtn', function () { //竞争-监控商品
        var dateType = $('.ebase-FaCommonFilter__top .ebase-FaCommonFilter__right .ant-btn-primary').find('span').html() == "实 时";
        var key = getLocalKeyControl(dateType)
        if (JSON.parse(localStorage.getItem(key))) {
            var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
            var middleData = JSON.parse(localData).value._d.data
            var finaData = dateType ? middleData.data : middleData;
            filterdataControl(finaData)
            chrome.runtime.sendMessage(indexTypes, function (res) {
                var length = res.payRate.length
                var page = $(".mc-ItemMonitor .ant-table-pagination .ant-pagination-item-active").attr('title')
                var pageSize = $(".mc-ItemMonitor .alife-dt-card-common-table-page-size-wrapper .ant-select-selection-selected-value").html()
                var loadDataLength = {
                    start: 0,
                    end: 0
                };
                if (!page) {
                    loadDataLength.end = length
                } else {
                    loadDataLength.start = (page - 1) * pageSize
                    loadDataLength.end = (page * pageSize) < length ? (page * pageSize) : length;
                }
                var trTotal = '<tr><td>商品信息</td><td>行业排名</td><td>交易金额</td><td>访客人数</td><td>搜索人数</td><td>收藏人数</td><td>加购人数</td><td>支付转化率</td><td>支付人数</td><td>客单价</td><td>UV价值</td><td>搜索占比</td><td>收藏率</td><td>加购率</td></tr>'
                for (var i = loadDataLength.start; i < loadDataLength.end; i++) {
                    var payNum = '',
                        pray1 = integer(res.payRate[i], "precent"),
                        pray2 = integer(res.uvIndex[i]);
                    if (pray1 == '-' || pray2 == '-') {
                        payNum = '-'
                    } else {
                        payNum = Math.round(pray1 * pray2)
                    }
                    var td = "<td><div class='info'><img src = '" + finaData[i].item.pictUrl + "'><span>" + finaData[i].item.title + "</span></div></td>"
                    td += "<td>" + (finaData[i].cateRankId ? finaData[i].cateRankId.value : '-') + "</td>"
                    td += "<td>" + res.tradeIndex[i] + "</td>"
                    td += "<td>" + res.uvIndex[i] + "</td>"
                    td += "<td>" + res.seIpv[i] + "</td>"
                    td += "<td>" + res.cltHit[i] + "</td>"
                    td += "<td>" + res.cartHit[i] + "</td>"
                    td += "<td>" + res.payRate[i] + "</td>"
                    td += "<td>" + payNum + "</td > "
                    td += "<td>" + formula(res.tradeIndex[i], payNum, 1) + "</td > "
                    td += "<td>" + formula(res.tradeIndex[i], res.uvIndex[i], 1) + "</td > "
                    td += "<td>" + formula(res.seIpv[i], res.uvIndex[i], 2) + "</td > "
                    td += "<td>" + formula(res.cltHit[i], res.uvIndex[i], 2) + "</td > "
                    td += "<td>" + formula(res.cartHit[i], res.uvIndex[i], 2) + "</td > "
                    trTotal += "<tr>" + td + "</tr>"
                }
                domStruct(trTotal, '监控商品')
            })
        }else{
            alert('请刷新重试')
        }
    })
    $(document).on('click', '#itemAnalysisTrend .oui-card-header .serachBtn', function () { //竞争-分析竞品
        var productId = searchItemhas()
        if (!productId.ispass) {
            alert('请选择比较商品')
        }
        var isCurrent = $('.ebase-FaCommonFilter__right .oui-date-picker-particle-button button.ant-btn-primary').index() == 0 ? true : false;
        var key = getCompareGoodsKey(isCurrent, productId)
        if (JSON.parse(localStorage.getItem(key))) {
            var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
            var middleData = JSON.parse(localData).value._d;
            var finaData = isCurrent ? middleData.data : middleData;
            filterdataCompare(finaData)
            chrome.runtime.sendMessage(indexTypes, function (res) {
                var productInfo = getProductInfo(productId)
                var proNum = 0;
                if (productInfo["rivalItem1"].title) {
                    proNum = 1
                } else if (productInfo["rivalItem2"].title) {
                    proNum = 2
                }
                var length = res.payRate.length - 1
                var trTotal = '<tr><td>类别</td><td>商品信息</td><td>交易金额</td><td>访客人数</td><td>支付转化率</td><td>支付人数</td><td>客单价</td><td>UV价值</td></tr>'
                for (var i = 0; i < length; i++) {
                    var tab1 = operatcPmpareData(res.uvIndex[0], res.payRate[0], res.tradeIndex[0])
                    var tab2 = operatcPmpareData(res.uvIndex[i + 1], res.payRate[i + 1], res.tradeIndex[i + 1])
                    var td = "<td><p class='btn'>本店商品</p></td>"
                    td += "<td><div class='info'><img src = '" + productInfo.selfItem.imgurl + "'><span>" + productInfo.selfItem.title + "</span></div></td>"
                    td += "<td>" + res.tradeIndex[0] + "</td>"
                    td += "<td>" + res.uvIndex[0] + "</td>"
                    td += "<td>" + res.payRate[0] + "</td>"
                    td += "<td>" + tab1.num1 + "</td>"
                    td += "<td>" + tab1.num2 + "</td>"
                    td += "<td>" + formula(res.seIpv[0], res.tradeIndex[0], 1) + "</td>"
                    var td1 = "<td><p class='btn red'>竞品" + (proNum + i) + "</p></td>"

                    td1 += "<td><div class='info'><img src = '" + productInfo["rivalItem" + (proNum + i)].imgurl + "'><span>" + productInfo["rivalItem" + (proNum + i)].title + "</span></div></td>"
                    td1 += "<td>" + res.tradeIndex[i + 1] + "</td>"
                    td1 += "<td>" + res.uvIndex[i + 1] + "</td>"
                    td1 += "<td>" + res.payRate[i + 1] + "</td>"
                    td1 += "<td>" + tab2.num1 + "</td>"
                    td1 += "<td>" + tab2.num2 + "</td>"
                    td1 += "<td>" + formula(res.seIpv[i + 1], res.tradeIndex[i + 1], 1) + "</td>"
                    trTotal += ("<tr>" + td + "</tr><tr>" + td1 + "</tr>")
                }
                domStruct(trTotal, '关键词指标对比')
            })
        }
    })
    $(document).on('click', '#sycm-mc-flow-analysis .oui-card-header .serachBtn', function () { //竞争-分析竞品-入口来源
        var isCurrent = $('.ebase-FaCommonFilter__right .oui-date-picker-particle-button button.ant-btn-primary').index() == 0 ? true : false;
        var productId = searchItemhas()
        if (!productId.ispass) {
            alert('请选择比较商品')
            return false;
        } else if (isCurrent) {
            alert('暂不支持实时转化！')
            return false;
        }
        var key = getResorceKey(productId)
        if (JSON.parse(localStorage.getItem(key))) {
            var localData = JSON.parse(localStorage.getItem(key)).split("|")[1];
            var finaData = JSON.parse(localData).value._d
            var indexData = filterResourcedata(finaData, productId)
            chrome.runtime.sendMessage(indexData, function (res) {
                var productInfo = getProductInfo(productId)
                var findRes = ayalyDatat(res)
                var length = findRes.payByr[0].length
                var secondeInfo = {}
                if (findRes.payByr.length == 2) {
                    secondeInfo.imgurl = productInfo.rivalItem1.imgurl ? productInfo.rivalItem1.imgurl : productInfo.rivalItem2.imgurl
                    secondeInfo.title = productInfo.rivalItem1.title ? productInfo.rivalItem1.title : productInfo.rivalItem2.title
                    secondeInfo.type = productInfo.rivalItem1.title ? 1 : 2

                }
                var page = $(".op-mc-item-analysis #sycm-mc-flow-analysis .ant-pagination-item-active").attr('title')
                var loadDataLength = {
                    start: 0,
                    end: 0
                };
                if (!page) {
                    loadDataLength.end = length
                } else {
                    loadDataLength.start = (page - 1) * 10
                    loadDataLength.end = (page * 10) < length ? (page * 10) : length;
                }
                var trTotal = '<tr><td>类别</td><td>商品信息</td><td>商品ID</td><td>流量来源</td><td>交易金额</td><td>访客人数</td><td>支付转化率</td><td>支付人数</td><td>客单价</td><td>UV价值</td></tr>'

                for (var i = loadDataLength.start; i < loadDataLength.end; i++) {
                    var td = "<tr><td><p class='btn'>本店商品</p></td>"
                    td += "<td><div class='info'><img src = '" + productInfo.selfItem.imgurl + "'><span>" + productInfo.selfItem.title + "</span></div></td>"
                    td += "<td>" + (productId.selfItemId ? productId.selfItemId : '-') + "</td>"
                    td += "<td>" + (finaData[i].pageName ? finaData[i].pageName.value : '-') + "</td>"
                    td += "<td>" + findRes.tradeIndex[0][i] + "</td>"
                    td += "<td>" + findRes.uvIndex[0][i] + "</td>"
                    td += "<td>" + findRes.payRate[0][i] + "</td>"
                    td += "<td>" + findRes.payByr[0][i] + "</td>"
                    td += "<td>" + formula(delePoint(findRes.tradeIndex[0][i]), delePoint(findRes.payByr[0][i]), 1) + "</td>"
                    td += "<td>" + formula(delePoint(findRes.tradeIndex[0][i]), delePoint(findRes.uvIndex[0][i]), 1) + "</td></tr>"
                    if (findRes.payByr.length == 2) {
                        var td1 = "<tr><td><p class='btn red'>竞品" + secondeInfo.type + "</p></td>"
                        td1 += "<td><div class='info '><img src = '" + secondeInfo.imgurl + "'><span>" + secondeInfo.title + "</span></div></td>"
                        td1 += "<td>" + (productId.rivalItem1Id ? productId.rivalItem1Id : productId.rivalItem2Id) + "</td>"
                        td1 += "<td>" + (finaData[i].pageName ? finaData[i].pageName.value : '-') + "</td>"
                        td1 += "<td>" + findRes.tradeIndex[1][i] + "</td>"
                        td1 += "<td>" + findRes.uvIndex[1][i] + "</td>"
                        td1 += "<td>" + findRes.payRate[1][i] + "</td>"
                        td1 += "<td>" + findRes.payByr[1][i] + "</td>"
                        td1 += "<td>" + formula(delePoint(findRes.tradeIndex[1][i]), delePoint(findRes.payByr[1][i]), 1) + "</td>"
                        td1 += "<td>" + formula(delePoint(findRes.tradeIndex[1][i]), delePoint(findRes.uvIndex[1][i]), 1) + "</td></tr>"
                        trTotal += (td + td1)
                    } else {
                        var td1 = "<tr><td><p class='btn red'>竞品1</p></td>"
                        td1 += "<td><div class='info'><img src = '" + productInfo.rivalItem1.imgurl + "'><span>" + productInfo.rivalItem1.title + "</span></div></td>"
                        td1 += "<td>" + (productId.rivalItem1Id) + "</td>"
                        td1 += "<td>" + (finaData[i].pageName ? finaData[i].pageName.value : '-') + "</td>"
                        td1 += "<td>" + findRes.tradeIndex[1][i] + "</td>"
                        td1 += "<td>" + findRes.uvIndex[1][i] + "</td>"
                        td1 += "<td>" + findRes.payRate[1][i] + "</td>"
                        td1 += "<td>" + findRes.payByr[1][i] + "</td>"
                        td1 += "<td>" + formula(delePoint(findRes.tradeIndex[1][i]), delePoint(findRes.payByr[1][i]), 1) + "</td>"
                        td1 += "<td>" + formula(delePoint(findRes.tradeIndex[1][i]), delePoint(findRes.uvIndex[1][i]), 1) + "</td></tr>"
                        var td2 = "<tr><td><p class='btn red'>竞品2</p></td>"
                        td2 += "<td><div class='info'><img src = '" + productInfo.rivalItem2.imgurl + "'><span>" + productInfo.rivalItem2.title + "</span></div></td>"
                        td2 += "<td>" + (productId.rivalItem2Id) + "</td>"
                        td2 += "<td>" + (finaData[i].pageName ? finaData[i].pageName.value : '-') + "</td>"
                        td2 += "<td>" + findRes.tradeIndex[2][i] + "</td>"
                        td2 += "<td>" + findRes.uvIndex[2][i] + "</td>"
                        td2 += "<td>" + findRes.payRate[2][i] + "</td>"
                        td2 += "<td>" + findRes.payByr[2][i] + "</td>"
                        td2 += "<td>" + formula(delePoint(findRes.tradeIndex[2][i]), delePoint(findRes.payByr[2][i]), 1) + "</td>"
                        td2 += "<td>" + formula(delePoint(findRes.tradeIndex[2][i]), delePoint(findRes.uvIndex[2][i]), 1) + "</td></tr>"
                        trTotal += (td + td1 + td2)
                    }

                }
                domStruct(trTotal, '入店来源')

            })
        }
    })
    $(document).on('click', '.chaqz-close', function () {
        $('.chaqz-wrapper').hide()
        tableInstance.destroy();
    })
    $(document).on('click', '.chaqz-export', function () {
        var tableTitle = $('.chaqz-wrapper .chaqz-table-title').html()
        var name = tableTitle?tableTitle:'查权重输出表单'
        $('#chaqz-table').tableExport({
            type: 'excel',
            escape: 'false',
            fileName: name
        });
    })
    $(document).on('click', '.copyBtn', function () {
        var clipboard = new ClipboardJS('.copyBtn', {
            target: function () {
                return document.querySelector('#chaqz-table');
            }
        });

        // clipboard.on('success', function (e) {
        //    alert('succee')
        // });

        // clipboard.on('error', function (e) {
        //     console.log(e);
        // });
    })
    $(document).on('click', '.op-mc-item-analysis .oui-date-picker-particle-button button',function(){
        window.location.reload()
    })

})

function getLocalKey() {
    var params = window.location.search.split('?')[1]
    params = decodeURIComponent(params)
    var starIndex = params.indexOf('cateId')
    var endIndex = params.indexOf('parentCateId')
    var middePara = params.slice(starIndex, endIndex - 2)
    var mechineInfo = getPageInfo();
    var completeKey = '/mc/live/ci/shop/monitor/listShop.json?' + middePara + mechineInfo.device + '&indexCode=uvIndex,tradeIndex,cateRankId&order=desc&orderBy=uvIndex&orderType=shop&sellerType=' + mechineInfo.sellType + '&type=all'
    return completeKey
}

function getLocalKeyControl(dateType) {
    var page = $('.ant-pagination .ant-select-selection-selected-value').html();
    page = page ? page : 1;
    var pageSize = $('.alife-dt-card-common-table-page-size-wrapper .ant-select-selection-selected-value').html();
    var keyFont = dateType ? "/mc/live/ci/item/monitor/list.json?" : "/mc/ci/item/monitor/list.json?"
    var keyEnd = getPageInfo();
    var params = window.location.search.split('?')[1]
    params = decodeURIComponent(params)
    var starIndex = params.indexOf('cateId')
    var endIndex = params.indexOf('parentCateId')
    var middePara = params.slice(starIndex, endIndex - 2)
    var completeKey = keyFont + middePara + keyEnd.device + '&indexCode=cateRankId,tradeIndex&order=desc&orderBy=tradeIndex&page=' + page + "&pageSize=" + pageSize + '&sellerType=' + keyEnd.sellType
    return completeKey

}

function getCompareGoodsKey(dateType, productId) {
    var keyFont = dateType ? "/mc/rivalItem/analysis/getLiveCoreIndexes.json?" : "/mc/rivalItem/analysis/getCoreIndexes.json?"
    var params = window.location.search.split('?')[1]
    params = decodeURIComponent(params)
    var starIndex = params.indexOf('cateId')
    var endIndex = params.indexOf('parentCateId')
    var middePara = params.slice(starIndex, endIndex - 1)
    var idData = ''
    if (productId['rivalItem1Id']) {
        idData += ('&rivalItem1Id=' + productId['rivalItem1Id'])
    }
    if (productId['rivalItem2Id']) {
        idData += ('&rivalItem2Id=' + productId['rivalItem2Id'])
    }
    idData += ('&selfItemId=' + productId['selfItemId'])
    var completeKey = keyFont + middePara + '&device=0' + idData
    return completeKey

}

function getResorceKey(productId) {
    var checkType = $('#sycm-mc-flow-analysis .oui-index-picker-list input:checked').attr('value')
    //  var keyFont = dateType ? "/mc/rivalItem/analysis/getLiveFlowSource.json?" : "/mc/rivalItem/analysis/getFlowSource.json?"
    var params = window.location.search.split('?')[1]
    params = decodeURIComponent(params)
    var starIndex = params.indexOf('cateId')
    var endIndex = params.indexOf('parentCateId')
    var middePara = params.slice(starIndex, endIndex - 1)
    var idData = ''
    if (productId['rivalItem1Id']) {
        idData += ('&rivalItem1Id=' + productId['rivalItem1Id'])
    }
    if (productId['rivalItem2Id']) {
        idData += ('&rivalItem2Id=' + productId['rivalItem2Id'])
    }
    idData += ('&selfItemId=' + productId['selfItemId'])

    // params.split('&').forEach(function(item){
    //     var key = item.split('=')
    //     if (key[0] == "rivalItem1Id" || key[0] == "rivalItem2Id" || key[0] == "selfItemId") {
    //        idData += key[1] ?("&"+key[0]+'='+key[1]):''
    //     }
    // })
    var completeKey = "/mc/rivalItem/analysis/getFlowSource.json?" + middePara + '&device=2&indexCode=' + checkType + '&order=desc&orderBy=' + checkType + idData
    return completeKey

}

function domStruct(data, title) {
    var hasWrap = $('.chaqz-wrapper').length
    var curTime = $('.ebase-FaCommonFilter__top .oui-date-picker-current-date').text()
    if (!hasWrap) {
        var wrapper = '<div class="chaqz-wrapper"><div class="content"><div class="head"><div class="title"><span class="chaqz-table-title">' + title + '</span><span class="time">' + curTime + '</span></div></div><div class="table-box"><table id="chaqz-table" style="width:100%"></table></div><span class="chaqz-close">×</span></div></div>'
        $('#app').append(wrapper)
    } 
    tableInstance= $('#chaqz-table').DataTable({
         data: data.data,
         columns: data.cols, 
         searching: false,
         ordering: false,
         info: false,
         dom: 'Bfrtip',
         buttons: [
              {
                  extend: 'csv',
                  title: title,
                  'bom': true,
              },
             {
                 extend: 'copy',
                 exportOptions: {
                     modifier: {
                         page: 'current'
                     }
                 }
            }
         ]
     });
     $('.chaqz-wrapper').fadeIn(100);
}
// function domStruct(tr, title) {
//     var hasWrap = $('.chaqz-wrapper').length
//     var curTimeText = $('.ebase-FaCommonFilter__top .oui-date-picker-current-date').html()
//     if (curTimeText) {
//         var curTime = curTimeText.split(/<\/?.+?\/?>/g)[3]
//     }
//     // console.log(curTime)
//     if (!hasWrap) {
//         var wrapper = '<div class="chaqz-wrapper"><div class="content"><div class="head"><div class="btns"><button class="copyBtn">一键复制</button><button class= "chaqz-export">导出excel</button></div><div class="title"><span class="chaqz-table-title">' + title + '</span><span class="time">' + curTime + '</span></div></div><div class="table-box"><table id="chaqz-table"> <tbody class="tbody">' + tr + '</tbody></table></div><span class="chaqz-close">×</span></div></div>'
//         $('#app').append(wrapper)
//     } else {
//         $('.chaqz-wrapper .time').html(curTime)
//         $('.chaqz-wrapper .chaqz-table-title').html(title)
//         $('.chaqz-wrapper #chaqz-table .tbody').html(tr)
//         $('.chaqz-wrapper').fadeIn(100);
//     }
// }
// 监控店铺过滤
function filterdata(data) {
    initSaveType()
    if (data) {
        data.forEach((item) => {
            // if (!item.shop_payRateIndex) {
            //     return false
            // }
            var va1 = item.shop_payRateIndex ? item.shop_payRateIndex.value:0;
            var va2 = item.shop_tradeIndex ? item.shop_tradeIndex.value : 0;
            var va3 = item.shop_payByrCntIndex ? item.shop_payByrCntIndex.value : 0;
            var va4 = item.shop_uvIndex ? item.shop_uvIndex.value : 0;
            var va5 = item.shop_seIpvUvHits ? item.shop_seIpvUvHits.value : 0;
            var va6 = item.shop_cartHits ? item.shop_cartHits.value : 0;
            var va7 = item.shop_cltHits ? item.shop_cltHits.value : 0;
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
// 监控商品过滤
function filterdataControl(data) {
    initSaveType()
    if (data) {
        data.forEach((item) => {
            // if (!item.payRateIndex) {
            //     return false
            // }
             var va1 = item.payRateIndex ? item.payRateIndex.value : 0;
             var va2 = item.tradeIndex ? item.tradeIndex.value : 0;
            //  var va3 = item.payByrCntIndex ? item.payByrCntIndex.value : 0;
             var va4 = item.uvIndex ? item.uvIndex.value : 0;
             var va5 = item.seIpvUvHits ? item.seIpvUvHits.value : 0;
             var va6 = item.cartHits ? item.cartHits.value : 0;
             var va7 = item.cltHits ? item.cltHits.value : 0;
            indexTypes.payRate.value.push(va1);
            indexTypes.tradeIndex.value.push(va2);
            //   indexTypes.payByr.value.push(item.payByrCntIndex.value);
            indexTypes.uvIndex.value.push(va4);
            indexTypes.seIpv.value.push(va5);
            indexTypes.cartHit.value.push(va6);
            indexTypes.cltHit.value.push(va7);
        });
    }
}
// 竞品分析过滤
function filterdataCompare(data) {
    initSaveType()
    if (data) {
        var dataArrr = [data['selfItem'], data["rivalItem1"], data["rivalItem2"]].filter(function (item) {
            return item
        })
        dataArrr.forEach(function (item) {
             var va1 = item.payRateIndex ? item.payRateIndex.value : 0;
             var va2 = item.tradeIndex ? item.tradeIndex.value : 0;
             //  var va3 = item.payByrCntIndex ? item.payByrCntIndex.value : 0;
             var va4 = item.uvIndex ? item.uvIndex.value : 0;
             var va5 = item.seIpvUvHits ? item.seIpvUvHits.value : 0;
             var va6 = item.cartHits ? item.cartHits.value : 0;
             var va7 = item.cltHits ? item.cltHits.value : 0;
             indexTypes.payRate.value.push(va1);
             indexTypes.tradeIndex.value.push(va2);
             //   indexTypes.payByr.value.push(item.payByrCntIndex.value);
             indexTypes.uvIndex.value.push(va4);
             indexTypes.seIpv.value.push(va5);
             indexTypes.cartHit.value.push(va6);
             indexTypes.cltHit.value.push(va7);
        })
    }
}
// 竞品来源入口
function filterResourcedata(data, produceData) {
    var types = {
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
        }
    }
    if (data) {
        data.forEach(function (item) {
            var item1 = item.selfItemPayRateIndex ? item.selfItemPayRateIndex.value : 0
            var item2 = item.selfItemTradeIndex ? item.selfItemTradeIndex.value : 0
            var item3 = item.selfItemPayByrCntIndex ? item.selfItemPayByrCntIndex.value : 0
            var item4 = item.selfItemUv ? item.selfItemUv.value : 0
            types.payRate.value.push(item1);
            types.tradeIndex.value.push(item2);
            types.payByr.value.push(item3);
            types.uvIndex.value.push(item4);
            if (produceData.rivalItem1Id) {
                var itemb1 = item.rivalItem1TradeIndex ? item.rivalItem1TradeIndex.value : 0
                var itemb2 = item.rivalItem1TradeIndex ? item.rivalItem1TradeIndex.value : 0
                var itemb3 = item.rivalItem1PayByrCntIndex ? item.rivalItem1PayByrCntIndex.value : 0
                var itemb4 = item.rivalItem1Uv ? item.rivalItem1Uv.value : 0
                types.payRate.value.push(itemb1);
                types.tradeIndex.value.push(itemb2);
                types.payByr.value.push(itemb3);
                types.uvIndex.value.push(itemb4);
            }
            if (produceData.rivalItem2Id) {
                var itemc1 = item.rivalItem2TradeIndex ? item.rivalItem2TradeIndex.value : 0
                var itemc2 = item.rivalItem2TradeIndex ? item.rivalItem2TradeIndex.value : 0
                var itemc3 = item.rivalItem2PayByrCntIndex ? item.rivalItem2PayByrCntIndex.value : 0
                var itemc4 = item.rivalItem2Uv ? item.rivalItem2Uv.value : 0
                types.payRate.value.push(itemc1);
                types.tradeIndex.value.push(itemc2);
                types.payByr.value.push(itemc3);
                types.uvIndex.value.push(itemc4);
            }

        })
    }
    return types
}


// 计算公式
function formula(val, val2, type) {
    if (val === '' || val == '-' || !val2 || val2 == '-') {
        return '-'
    } else {
        val = (val + '').replace(',', '');
        val2 = (val2 + '').replace(',', '')
        if (type == 1) {//四舍五入
            return (Math.round((val / val2) * 100) / 100).toFixed(2)
        } else if (type == 2) {//百分比四舍五入
            return (Math.round((val / val2) * 10000) / 100).toFixed(2) + '%'
        }
    }
}
// 取整/格式化
function integer(val,type){
    if(val==0){
        return 0
    }else if(!val || val=='-'){
        return '-'
    }else{
        val=(val+'').replace(',','')
        if(type=='inter'){
            return Math.round(val)
        }else if(type=='precent'){
             return (val.indexOf('%') !== -1)?(val.slice(0, -1) / 100):val
        }else{
            return val
        }
    }
}
// 返回数据格式修改
function delePoint(val) {
    val = (val + '').replace(',', '')
    if (val.indexOf('%') !== -1) {
        return val.slice(0, -1) / 100
    } else {
        return val
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
//  获取页面静态信息
function getPageInfo() {
    var endpointTyep = $('.ebase-FaCommonFilter__bottom .fa-common-filter-device-select .oui-select-container-value').html() //终端类型
    var shopType = $('.ebase-FaCommonFilter__bottom .sellerType-select .ant-select-selection-selected-value').attr('title') //店铺  天猫淘宝
    var device = endpointTyep == '所有终端' ? '0' : endpointTyep == 'PC端' ? '1' : endpointTyep == '无线端' ? '2' : ''
    var sellType = shopType == '全部' ? '-1' : shopType == '天猫' ? '1' : shopType == '淘宝' ? '0' : ''
    return {
        device: device,
        sellType: sellType
    }
}
//竞品页面判断选择几项了
function searchItemhas() {
    var params = window.location.search.split('?')[1]
    var keyValue = params.split('&')
    var obj = {};
    keyValue.forEach(function (item) {
        var key = item.split("=")
        if (key[1]) {
            obj[key[0]] = key[1];
        }
        if (obj.length < 2) {
            obj.ispass = false
        } else {
            obj.ispass = true
        }
    })
    return obj

}
// 获取商品信息
function getProductInfo(pro) {
     var items = $('#itemAnalysisSelect .sycm-common-select-wrapper .alife-dt-card-sycm-common-select')
    var productTitle = $(items[0]).find('.sycm-common-select-selected-title').attr('title')
    var productImg = $(items[0]).find('.sycm-common-select-selected-image-wrapper img').attr('src') 
    var info = {
        selfItem: {
            imgurl: productImg,
            title: productTitle
        },
        rivalItem1: {
            imgurl: '',
            title: ''
        },
        rivalItem2: {
            imgurl: '',
            title: ''
        }
    }
    if (pro['rivalItem1Id']) {
       
        var product1Title = $(items[1]).find('.sycm-common-select-selected-title').attr('title')
        var product1Img = $(items[1]).find('.sycm-common-select-selected-image-wrapper img').attr('src')
        info.rivalItem1.imgurl = product1Img
        info.rivalItem1.title = product1Title
    }
    if (pro['rivalItem2Id']) {
        var product2Title = $(items[2]).find('.sycm-common-select-selected-title').attr('title')
        var product2Img = $(items[2]).find('.sycm-common-select-selected-image-wrapper img').attr('src')
        info.rivalItem2.imgurl = product2Img
        info.rivalItem2.title = product2Title
    }
    return info
}
//入口来源
function ayalyDatat(data) {
    var productId = searchItemhas()
    var itemNum = 2
    var midData = {
        payByr: [
            [],
            []
        ],
        payRate: [
            [],
            []
        ],
        tradeIndex: [
            [],
            []
        ],
        uvIndex: [
            [],
            []
        ]
    }
    if (productId.rivalItem1Id && productId.rivalItem2Id) {
        itemNum = 3
        midData = {
            payByr: [
                [],
                [],
                []
            ],
            payRate: [
                [],
                [],
                []
            ],
            tradeIndex: [
                [],
                [],
                []
            ],
            uvIndex: [
                [],
                [],
                []
            ],
            type: 3
        }
    } else if (productId.rivalItem1Id.title) {
        midData.type = 1
    } else {
        midData.type = 2
    }

var payByr = data.payByr
var payRate = data.payRate
var tradeIndex = data.tradeIndex
var uvIndex = data.uvIndex
payByr.forEach(function (item, index) {
    if (itemNum == 2) {
        if (index % 2 == 0) {
            midData.payByr[0].push(item)
        } else if (index % 2 == 1) {
            midData.payByr[1].push(item)
        }
    } else if (itemNum == 3) {
        if (index % 3 == 0) {
            midData.payByr[0].push(item)
        } else if (index % 3 == 1) {
            midData.payByr[1].push(item)
        } else if (index % 3 == 2) {
            midData.payByr[2].push(item)
        }
    }
})
payRate.forEach(function (item, index) {
    if (itemNum == 2) {
        if (index % 2 == 0) {
            midData.payRate[0].push(item)
        } else if (index % 2 == 1) {
            midData.payRate[1].push(item)
        }
    } else if (itemNum == 3) {
        if (index % 3 == 0) {
            midData.payRate[0].push(item)
        } else if (index % 3 == 1) {
            midData.payRate[1].push(item)
        } else if (index % 3 == 2) {
            midData.payRate[2].push(item)
        }
    }
})
tradeIndex.forEach(function (item, index) {
    if (itemNum == 2) {
        if (index % 2 == 0) {
            midData.tradeIndex[0].push(item)
        } else if (index % 2 == 1) {
            midData.tradeIndex[1].push(item)
        }
    } else if (itemNum == 3) {
        if (index % 3 == 0) {
            midData.tradeIndex[0].push(item)
        } else if (index % 3 == 1) {
            midData.tradeIndex[1].push(item)
        } else if (index % 3 == 2) {
            midData.tradeIndex[2].push(item)
        }
    }
})
uvIndex.forEach(function (item, index) {
    if (itemNum == 2) {
        if (index % 2 == 0) {
            midData.uvIndex[0].push(item)
        } else if (index % 2 == 1) {
            midData.uvIndex[1].push(item)
        }
    } else if (itemNum == 3) {
        if (index % 3 == 0) {
            midData.uvIndex[0].push(item)
        } else if (index % 3 == 1) {
            midData.uvIndex[1].push(item)
        } else if (index % 3 == 2) {
            midData.uvIndex[2].push(item)
        }
    }
})
return midData
}
//数据处理-竞品分析
function operatcPmpareData(v1, v2, v3) {
    v1 = (v1 + '').replace(',', '')
    v2 = (v2 + '').replace(',', '')
    v3 = (v3 + '').replace(',', '')
    var result = {
        num1: 0,
        num2: 0
    }
    if (!v1 || !v2 || v1 == '-' || v2 == '-') {
        result.num1 = '-';
        result.num2 = '-';
    } else if (!v3 || v3 == '-') {
        v2 = v2.slice(0, -1)
        result.num1 = Math.round(v1 * v2/100)
        result.num2 = '-';
    } else {
        v2 = v2.slice(0, -1)
        result.num1 = Math.round(v1 * v2/100)
        result.num2 = Math.round((v3 / result.num1) * 100).toFixed(2) / 100;
    }
    return result
}
//自动刷新
function autoRefresh() {
    var params = window.location.search
    var selfItem = params.indexOf('selfItemId')
    if (!selfItem) {
        window.location.reload();
    }
}