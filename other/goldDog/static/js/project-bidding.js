$(function () {
    // 选择分期方式
    $('#payment').on('click', '.item', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $("#downPayment").val($(this).find("input").val());
    })
    // 默认总价格
    function getTotalPrice() {
        /*var tList = $('#countPrice').find('.ulist');
        var tlistLength = tList.length;
        if(!tlistLength){return}
        var totalPrice = 0;
        for (var i = 0; i < tlistLength; i++) {
            totalPrice += parseInt(tList.eq(i).find('.count').html()) * parseInt(tList.eq(i).find('.price').html())
        }*/
        $('#tPrice').find('input').val($("#totalPrice").val())
    }
    getTotalPrice();
    // 总价格输入框
    $("#tPrice input").focus(function () {
        $(this).css("color", "#333")
        $(this).parent().addClass('active')
    })
    $("#tPrice input").blur(function () {
        $(this).css("color", "#ccc")
        $(this).parent().removeClass('active')
         $('.total-price .hint').hide()
          $('.confirm-bidding .agreee .hint').hide()
    })
    $("#tPrice input").keyup(function(){
        $(this).val($(this).val().replace(/[^\d]/g, ''))
    })
    // 倒计时

    // 我同意图标
    $('.confirm-bidding .agreee label').click(function(){
        $(this).find('i').toggleClass('checked')
        $('.top-title .agreee .hint').hide();
    })
    // 竞标按钮
    $('#bid').click(function(){
        var tPrice = $('.total-price .pt input').val()
        // 当总计总价为空
        if(!tPrice){
            $('.total-price .hint').show()
        } 
        var users = getUserCookie("zcm_users");
        // 判断是否登录 
        if(users !="null"){
        	var parm = "biddingPrice=" + tPrice + "&downPayment=" 
        	+ $("#downPayment").val() + "&materialId=" + $("#materialId").val();
            // 跳转至确认竞标页面
        	window.location.href ="../bidding/toBidding?"+parm;
         }else{
             // 跳转至登陆页
        	 window.location.href ='../users/toLogin';
         }
    })

    // 确认竞标
$('#sureBid').click(function(){
    // 判断填写完整
    var tPrice = $('.total-price .pt input').val();
    var checkbox = $('.confirm-bidding .agreee i').hasClass('checked')
    if (!tPrice) {
        $('.total-price .hint').show()
        return false
    } else if (!checkbox){
        $('.confirm-bidding .agreee .hint').show()
        return false
    }
    
     $.ajax({
         type:'POST',
         data:{
        	 biddingPrice:tPrice,
        	 materialId:$("#materialId").val(),
             firstPayMent:getfirstPayMent($("#downPayment").val())
         },
         url: "../bidding/saveBidding",
         success:function(data){
        	 if(data.code == 200){
        		 window.location.href ="../bidding/toSuccessBiddign?materialId="+$("#materialId").val();
        	 }else{
        		dialog({
 					desc:data.desc
 			 });
        	 }
         },
         error:function(){

         }
     })
    // 跳转至竞标申请成功
    //
})

 function getfirstPayMent(pType){
    	
    if(pType=='F'){
    	return 0;
    }else if(pType=="S"){
    	return 1.2;
    }else{
    	return 1.3;
    }
 }
})