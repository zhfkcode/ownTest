$(function() {
	$("#loginSubmit").click(function(){
		if ($("#loginSubmit").hasClass("btn_able")) {
			var isMobile=/^(13[0-9]|17[0-9]|14[57]|15([0-3]|[5-9])|18[0-9])\d{8}$/;//手机号正则
			var isPassword=/[^\u4E00-\u9FA0]{6,16}$/;//密码正则
	    	$(".error").text("");
			var json = {
				phoneNumber:$("#userName").val(),
				userPassWord:$("#loginPwd").val()
			};
			if(!json.phoneNumber){
				$("#userName-error").text("手机号码不能为空");
				return false;
			}else if(!isMobile.test(json.phoneNumber)){
				$("#userName-error").text("请正确填写手机号码"); 
				return false;       
			}else if(!json.userPassWord){
				$("#loginPwd-error").text("登录密码不能为空");
				return false;
			}else if(!isPassword.test(json.phoneNumber)){
				$("#userName-error").text("请正确填写登录密码"); 
				return false;       
			}else{
				$("#loginSubmit").removeClass("btn_able");
				$.post("../users/login",json,function(data){
					$("#loginSubmit").addClass("btn_able");
					if(data == -1){
						$("#userName-error").text("该用户不存在");
						return false;
					}
					if(data == 0){
						window.location.href = "../index/indexPage";
						return true;
					}
					if(data > 0){
						$("#loginPwd-error").text("密码错误,您还有"+(5-data)+"次输入机会");
						return false;
					}else{
						$("#loginPwd-error").text("密码错误已达5次机会，请明天再试或联系客服");
						return false;
					}
				},"json");
	    	}
	    }
	})
})