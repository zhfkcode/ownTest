/*个人信息*/
var isPassword = /[^\u4E00-\u9FA0]{6,16}$/;//密码正则;
var cTime = time = 60;
function countdownLogin(){//到计时
	var seconds=time;
	$("#getVerify_login").text(seconds+"s");
	time--;
	TimerLofin=setTimeout("countdownLogin()",1000);
	if(time<0){
		clearTimeout(TimerLofin);
		$("#getVerify_login").text("立即获取");
		time=cTime;
	}
};

var infoModel = {
	flag:false,
	account:"", // 用户名
	original:[0,0,0,0],  // 判断当前收起是否为更新内容
	infoStash:['','',''], // 当前用户信息暂存处
	btnTxt:["收起",""], // 按钮的显示状态
	tickCurr:-1, // 当前选择的类型 2:修改登录密码
	verify:"",//验证码信息
	LoginHtmlAmend:[],
	init:function(){
		this.LoginHtmlAmend[0] = '<ul><li><label class="ipt_name">您的账户：</label><p class="txt">'+ mtel($("#phoneNumber").val()) +'</p></li><li><label class="ipt_name">短信验证码：</label><p class="ipt_txtwrap"><input type="text" class="ipt_txt2 ipt_border" placeholder="请输入验证码" name="verify_login"/><span class="get_verify" id="getVerify_login">立即获取</span><label class="error verify_login_error"></label></p></li><li><a class="btn btn_loginpwd1">下一步</a></li></ul>';
		this.LoginHtmlAmend[1] = '<ul><li><label class="ipt_name">登录密码：</label><p class="ipt_txtwrap"><input type="password" class="ipt_txt ipt_border" placeholder="请输入6~16位英文或数字登录密码" maxlength="16" name="password_login"/><label class="error password_login_error"></label></p></li><li><label class="ipt_name">确认密码：</label><p class="ipt_txtwrap"><input type="password" class="ipt_txt ipt_border" placeholder="请再次输入登录密码" maxlength="16" name="pwdConfirm_login"/><label class="error pwdConfirm_login_error"></label></p></li><li><a class="btn btn_loginpwd2">下一步</a></li></ul>';
		this.LoginHtmlAmend[2] ='<ul><li><label class="ipt_name">物资分类：</label><div class="txt"><div class="select-sim"><div class="text">'+$("#accountClassify").val()+'</div><ul class="options" id ="classifyList"></ul></div></div></li><li><a id="supTypeBtn" class="btn btn_loginpwd1">确定</a></li></ul>'
	},
	startFun:function($this){ // 展开，收起显示起始判断
		var sl_s = $this.data("state");  // 标记改变后模块：隐藏 0||显示 1
		infoModel.tickCurr = $this.data("tick"); // 标记模块
		if(sl_s == 1){
			$.post("../material/materialClassifyChid",{"parentId":0},function(data){
				var classifyList ="";
				$.each( data.data, function( key, val ) {
					classifyList +='<li data-value="'+key+'">'+val.classifyName+'</li>'
				} );
				$("#classifyList").html(classifyList);
			});
			// 展示模块内容，是否初始化模块内容，方法内部判断
			infoModel.selectHtmlFun(infoModel.tickCurr);
		}

		infoModel.slideLocker($this,infoModel.tickCurr,sl_s);
	},
	selectHtmlFun:function(tick){ // 初始当前模块内容
		// 判断当前模块是否需要初始模块内容
		if(infoModel.original[tick] == 0 && tick == 2){ // 修改登录密码
			var htmlStr = infoModel.LoginHtmlAmend[0];
			$(".accordion_wrap"+tick).html('<div class="info_locker_cnt">'+htmlStr+'</div>');
			infoModel.original[tick] = 1;
			this.modifyLoginPwd();
		}else if(infoModel.original[tick] == 0 && tick == 1){
			var htmlStr = infoModel.LoginHtmlAmend[2];
			$(".accordion_wrap"+tick).html('<div class="info_locker_cnt">'+htmlStr+'</div>');
			infoModel.original[tick] = 1;
			this.changeType();
		}
	},
	slideLocker:function($this,tick,sl_s){ //展开、收起效果   tick 当前选择的类型,用于选择展示收起的类名序号，sl_s 模块改变之后的状态,0：收起，1：展开
		var h = 0;
		this.btnTxt[1] = $this.data("txt");

		if(sl_s == 1){ // sl_s == 1  模块改变后为显示状态
			h = $('.accordion_wrap'+tick).find(".info_locker_cnt").height()+36;
			$this.find("font").text(this.btnTxt[0]);
			$this.addClass("ilk_btn_on");

			this.infoStash[tick] = $this.siblings("em.txt").text();
			$this.siblings("em.txt").text("");
		}else{
			$this.find("font").text(this.btnTxt[1]);
			$this.removeClass("ilk_btn_on");
		}

		$('.accordion_wrap'+tick).stop().animate({
			height:h
		},200,function(){
			if(sl_s == 0){
				$this.siblings("em.txt").text(infoModel.infoStash[tick]);
			}
			// 改变按钮识别状态
			infoModel.original[tick] = sl_s;
			sl_s = sl_s==0?1:0;
			$this.data("state",sl_s);
		});
	},
	slideAuto:function($this){ // 自动变动展示模块高度
		setTimeout(function(){
			var h = $this.find(".info_locker_cnt").height()+36;
			$this.stop().animate({
				height:h
			},300);
		},200);
	},
	modifyLoginPwd:function(){  // 修改登录密码 1
		//获取验证码
		$("#getVerify_login").click(function(){
			var mobile = $("#phoneNumber").val();
			if(time!=cTime){
				return false;
			}else{
				countdownLogin();//执行到计时
				$.post("../commons/sms/sendMsg",{phoneNum:mobile,type:2},function(data){
					dialog({
						desc:data.desc
					});
				});
			}				
		});
		//验证验证码
		$(document).on("click",".btn_loginpwd1" ,function(){
			$(".error").text('');
			var verify = $("input[name='verify_login']").val();
			if(!infoModel.flag){
				if(!verify){
					$(".verify_login_error").text("验证码不能为空");
					return false;
				}
				/*$.post("../users/resetPassword",{verify:verify},function(data){
					infoModel.flag = false;
					if(data.code==200){ // 短信验证成功
					}else{
						dialog({
							desc:data.desc
						});
						return false;
					}
				});*/
				var htmlStr = infoModel.LoginHtmlAmend[1];
				$(".accordion_wrap2").html('<div class="info_locker_cnt">'+htmlStr+'</div>');
				infoModel.slideAuto($(".accordion_wrap2")); // 自动缩放模块高度
				infoModel.modifyLoginPwd2(); // 运行修改密码第二部分js代码
				infoModel.flag = true;
				infoModel.verify=verify;
			}
		});
	},
	modifyLoginPwd2:function(){ // 修改登录密码 2
		$(document).on("click",".btn_loginpwd2" ,function(){
			$(".error").text("");
			var jsonML = {
				userPassWord:$("input[name='password_login']").val(),
				password_login:$("input[name='pwdConfirm_login']").val(),
				phoneNumber:$("#phoneNumber").val(),
				smsCode:infoModel.verify
			}

			if(infoModel.flag){
				if(!jsonML.userPassWord){
					$(".password_login_error").text('密码不能为空');
					return false;
				}else if(!isPassword.test(jsonML.userPassWord)){
					$(".password_login_error").text('密码格式错误');
					return false;
				}else if(!jsonML.password_login){
					$(".pwdConfirm_login_error").text('密码不能为空');
					return false;
				}else if(!isPassword.test(jsonML.password_login)){
					$(".pwdConfirm_login_error").text('密码格式错误');
					return false;
				}else if(jsonML.password_login != jsonML.userPassWord){
					$(".pwdConfirm_login_error").text('两次输入的密码不一致');
					return false;
				}
				infoModel.flag = true;
				$.post("../users/resetPassword",jsonML,function(data){
					infoModel.flag = false;
					if(data.code == 200){ // 登录密码修改成功
						infoModel.original[0] = 0;
						var htmlStr = '<div class="info_locker_center"><img src="../static/img/success-bid.jpg"><p>恭喜您，登录密码修改成功！</p></div>';
						$(".accordion_wrap2").html('<div class="info_locker_cnt">'+htmlStr+'</div>');
						infoModel.slideAuto($(".accordion_wrap2")); // 自动缩放模块高度
					}else{
						dialog({
							desc:data.desc
						});
					}
				});
			}
		});
	},
	changeType:function(){//修改账户类型后
		  // 模拟下拉框
		  $(document).on('click', '.select-sim', function () {
            var _this = this
            var select = $(this).find('.options')
            if (!$(this).hasClass("_show")) {
                $(this).addClass('_show')
                setHidden(_this,'visible')
                select.slideDown(500)
                $('.select-sim li').click(function (e) {
                    e = e || window.event
                    e.stopPropagation()
                    var html = $(this).html()
                    $('.select-sim .text').html(html)
                    $('.select-sim input').val(html)
					select.hide(100)
					$(_this).removeClass('_show')
                    setHidden(_this,'hidden')
                })
            }else{
                select.hide(100)
                $(this).removeClass('_show')
                setHidden(_this,'hidden')
            }
		})
		 // 控制显隐性
		 function setHidden(el,hidValue){
            $(el).parent().parent().css('overflow',hidValue)
            $(el).parents('.epr_info_locker').css('overflow',hidValue)
        }
		$(document).on('click','#supTypeBtn',function(){
			var selected = $(".accordion_wrap1").find('.text').html();
			$.post('../users/updateAccoutType',{"accountClassify":selected},function(data){
			if(data  > 0){
				infoModel.original[1] = 0;
				var htmlStr = '<div class="info_locker_center"><img src="../static/img/success-bid.jpg"><p>恭喜您，账户类型修改成功！</p></div>';
				$(".accordion_wrap1").html('<div class="info_locker_cnt">'+htmlStr+'</div>');

				infoModel.slideAuto($(".accordion_wrap1")); // 自动缩放模块高度
			}else{
				dialog({
					desc:data.err
				});
			}
			
		})
		})
	}
}
$(function(){
	// 给模块内容数组，赋值
	infoModel.init();
    $(".header").hide();
    $("#company").html($("#companyName").val());
	// 展开，收起
	$(".ilk_btn").click(function(){
		var _this = $(this);
		infoModel.startFun(_this);
	});
});

function mtel(op){
    return op.substr(0, 3) + '****' + op.substr(7);  
}