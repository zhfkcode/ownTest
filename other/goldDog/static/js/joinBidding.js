$(function () {
	$(".header").hide();
    $(document).on('click', ".fix-box", function () {
        var _this = $(this)
        var dataStat = $(this).data('stat')
        $('.fix-box').removeClass('_select')
        _this.addClass('_select')
        $(".modify-box").show()
        $(".modify-box").data('stat', dataStat)
        if (dataStat == 1) {
            $(".modify-box").find('.checkbox').show()
            $(".modify-box").find('.text').hide()
        } else if (dataStat == 2) {
            $(".modify-box").find('.text').show()
            $(".modify-box").find('.checkbox').hide()
            $('.modify-box .text-pt').val(_this.find('.info').text().slice(1))
        }
        getLocation(_this)
        $(window).on('scroll', function () {
            getLocation(_this)
            console.log(11)
        })
    })
// 获取弹框位置
    function getLocation(el) {
        var scrollHeight = $(document).scrollTop()
        var offsetTop = $(el).offset().top - scrollHeight + 75
        var offsetLeft = $(el).offset().left
        var fixBoxWidth = $(".modify-box").width() / 2
        offsetLeft = offsetLeft - (fixBoxWidth - 68)
        $(".modify-box").css({
            'top': offsetTop,
            'left': offsetLeft
        })
    }

    $('.modify-box .checkbox').on('click', '.item', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    })
    // 确认按钮
    $('.modify-box .ensure').click(function () {
        var box = $('.modify-box')
        var stat = box.data('stat')
        var getData  
        if (stat == 1) {
            getData  = box.find('.cur').html();
            
        } else if (stat == 2) {
            getData  = box.find('.text-pt').val();
        }
        $.post('url', 'data', function (data) {
            if (data.state == 1) {
                if(stat == 2){getData="￥" +getData}
                $('.fix-box._select .info').html(getData)
                $(".modify-box").hide()
                $(window).off('scroll')
            } else {
                dialog({
                    desc: data.err
                });
                return false;
            }
        })
       

    })
    // 取消按钮
    $('.modify-box .cancel').click(function () {
        $(".modify-box").hide()
        $(window).off('scroll')
    })
    // 弹框修改价格input
    $('.modify-box .text-pt').keyup(function () {
        $(this).css('color','#333')
        $(this).val($(this).val().replace(/[^\d]/g, ''))
    })
    $('.modify-box .text-pt').blur(function () {
        $(this).css('color','#ccc')
        $(this).val('')
    })
})