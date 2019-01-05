var key = '/mc/live/ci/item/monitor/list.json?cateId=16&dateRange=2019-01-05|2019-01-05&dateType=today&device=0&indexCode=cateRankId,tradeIndex&order=desc&orderBy=tradeIndex&page=1&pageSize=10&sellerType=-1'
$(function () {
    console.log(222)
    $('#app').on('DOMNodeInserted', function (e) {
        console.log(e.target.className)
        // var dom = $(this).find('.ebase-FaCommonFilter__right')
        if (e.target.className == 'ebase-metaDecorator__root') {
            $('.ebase-FaCommonFilter__bottom .ebase-FaCommonFilter__right').prepend('<button>hello baby</button>')
            $('#app').off('DOMNodeInserted')
        }


        //    $(this).on('DOMNodeInserted')
        //    $(this).off()

    })
    var localData = JSON.parse(localStorage.getItem(key)).split("|")[1]
    console.log(JSON.parse(localData).value._d.data.data)
})