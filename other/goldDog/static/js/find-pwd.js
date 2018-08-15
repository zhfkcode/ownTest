var cTime = time = 60;
function countdown(){//到计时
	var seconds=time;
	$(".js-get-code").text(seconds+"秒").removeClass("btn_able");
	time--;
	Timer=setTimeout("countdown()",1000);
	if(time<0){
		clearTimeout(Timer);
		$(".js-get-code").text("获取验证码").addClass("btn_able");
		time=cTime;
	}
};
$(function () {
	var isMobile=/^(13[0-9]|17[0-9]|14[57]|15([0-3]|[5-9])|18[0-9])\d{8}$/;//手机号正则
	var isPassword=/[^\u4E00-\u9FA0]{6,16}$/;//密码正则
    $(".js-get-code").click(function(){
    	if ($(".js-get-code").hasClass("btn_able")) {
			var json = {
					phoneNum:$("input[name='phone']").val(),
					type:2
			}
			$("label.error").text("");
			if(!json.phoneNum){
				$("#userName-error").text("手机号码不能为空");
				return false;//time!=cTime || 
			}else if(!isMobile.test(json.phoneNum)){
				$("#userName-error").text("请正确填写手机号"); 
				return false;
			}else{
					$.post("../commons/sms/sendMsg",json,function(data) {
						if(data.code == 100){
							countdown();
						}else if(data.code == 103){
							$("#userName-error").text("验证码未失效");
						}else if(data.code == 104){
							$("#userName-error").text("改手机号码未被注册");
						}else{
							$("#userName-error").text(data.error);
						}
					})
			}
		}
	});
	$("#registerSubmit").click(function() {
		if ($("#registerSubmit").hasClass("btn_able")) {
			var json = {
				phoneNumber:$("input[name='phone']").val(),
				smsCode:$("input[name='author']").val(),
				userPassWord:$("input[name='pwd']").val(),
				pwd2:$("input[name='pwd2']").val()
			}
			$("label.error").text("");
			if(!json.phoneNumber){
				$("#userName-error").text("手机号码不能为空");
				return false;
			}else if(time!=cTime || !isMobile.test(json.phoneNumber)){
				$("#userName-error").text("请正确填写手机号"); 
				return false;
			}else if(!json.smsCode){
				$("#verification-error").text("验证码码不能为空");
				return false;
			}else if(!json.userPassWord){
				$("#pwd-error").text("密码不能为空"); 
				return false;
			}else if(!isPassword.test(json.userPassWord)){
				$("#pwd-error").text("密码格式不对，由6到16位字符组成"); 
				return false;       
			}else if(!json.pwd2){
				$("#pwd2-error").text("请再次输入密码"); 
				return false;
			}else if(json.userPassWord != json.pwd2){
				$("#pwd2-error").text("两次密码输入不一致"); 
				return false;
			}else{
				$("#registerSubmit").removeClass("btn_able");
				$.post("../users/resetPassword",json,function(data) {
					$("#registerSubmit").addClass("btn_able");
					if (data.code ==200) {
						window.location.href = "../index/indexPage";
						return true;
					}else{
						clearTimeout(Timer);
						$(".js-get-code").text("获取验证码").addClass("btn_able");
						time=cTime;
						$("#pwd2-error").text(data.error);
					}
				},"json")
			}
		}
	})
})