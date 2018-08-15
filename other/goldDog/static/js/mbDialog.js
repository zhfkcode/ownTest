var addEvent = function(obj, sEv, fn){
	if(document.addEventListener){
		obj.addEventListener(sEv, fn, false);
	}else{
		obj.attachEvent('on'+sEv, fn);
	}
};
//弹框1.0.1
var dialog = function(params){
	var title = params.title || "", //dialog标题
		eventType = params.eventType || "click", //绑定动作
		desc = params.desc, //dialog内容
		ok = params.ok || true, //是否显示确定按钮
		cancel = params.cancel || false, //是否显示取消按钮
		okVal = params.okVal || "确定",  //确定按钮显示文字
		okFun = params.okFun || function(){}, //确定回调函数
		cancelVal = params.cancelVal || "取消", //取消按钮显示文字
		cancelFun = params.cancelFun || function(){}; //取消回调函数
	//按钮赋值
	var okBtn = ok ? '<a class="okBtn">' + okVal + '</a>' : '',
		cancelBtn = cancel ? '<a class="cancelBtn">' + cancelVal + '</a>' : '';
	
	var innerTag = '<div class="dialog_box">'+
						'<div class="dialog_tit">'+
							'<h2>'+title+'</h2>'+
						'</div>'+
						'<div class="dialog_cnt">'+
							'<p>'+desc+'</p>'+
						'</div>'+
						'<div class="dialog_btnBox">'+ okBtn + cancelBtn +'</div>'+
					'</div>'+
					'<div class="dialog_bg"></div>';

	var parentNode = document.getElementsByTagName("body")[0];
	var wrapEle = null;

	wrapEle = document.createElement("div");
	wrapEle.style.display="block";
	wrapEle.innerHTML = innerTag;

	var curObj = parentNode.appendChild(wrapEle);

	if(ok){
		addEvent(curObj.getElementsByTagName("a")[0],eventType,function(){
			if(curObj){
				curObj.parentNode.removeChild(curObj);
			};
			okFun();
		},false);
	}
	if(cancel){
		addEvent(curObj.getElementsByTagName("a")[1],eventType,function(){
			if(curObj){
				curObj.parentNode.removeChild(curObj);
			};
			cancelFun();
		},false);
	}
};